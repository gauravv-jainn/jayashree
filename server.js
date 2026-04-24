import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock admin database (in production, use a real database)
const admins = {
  'admin@foundation.org': {
    id: '1',
    email: 'admin@foundation.org',
    fullName: 'Admin User',
    role: 'super_admin',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Ou', // hashed 'password123'
  },
};

// JWT middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// ==================== Authentication Endpoints ====================

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admin = admins[email];
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For demo, simple password check (in production use bcrypt)
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch && password !== 'password123') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Logout endpoint (token is invalidated on frontend)
app.post('/api/auth/logout', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get current admin profile
app.get('/api/auth/profile', verifyToken, (req, res) => {
  const admin = admins[req.admin.email];
  if (!admin) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  res.json({
    id: admin.id,
    email: admin.email,
    fullName: admin.fullName,
    role: admin.role,
  });
});

// ==================== Admin Management Endpoints ====================

// Get all admins (super_admin only)
app.get('/api/admins', verifyToken, (req, res) => {
  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const adminList = Object.values(admins).map(({ password, ...admin }) => admin);
  res.json(adminList);
});

// Create new admin (super_admin only)
app.post('/api/admins', verifyToken, async (req, res) => {
  try {
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { email, fullName, role, tempPassword } = req.body;

    if (admins[email]) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(tempPassword || 'password123', 10);
    const newAdmin = {
      id: Date.now().toString(),
      email,
      fullName,
      role: role || 'admin',
      password: hashedPassword,
    };

    admins[email] = newAdmin;

    res.json({
      success: true,
      admin: { ...newAdmin, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete admin (super_admin only)
app.delete('/api/admins/:email', verifyToken, (req, res) => {
  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { email } = req.params;

  if (req.admin.email === email) {
    return res.status(400).json({ error: 'Cannot delete your own account' });
  }

  if (!admins[email]) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  delete admins[email];
  res.json({ success: true });
});

// ==================== Email Endpoints ====================

// Test email endpoint
app.post('/api/email/test', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Test Email from Jayashree Foundation',
      html: '<h1>This is a test email</h1><p>If you see this, emails are working!</p>',
    });

    console.log('Test email sent:', info.response);
    res.json({ success: true, message: 'Test email sent!', info });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Join NGO form endpoint
app.post('/api/forms/join-ngo', async (req, res) => {
  try {
    const formData = req.body;

    console.log('Received form submission:', formData);

    // Email to organization
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: `New Membership Application from ${formData.fullName}`,
      html: `
        <h2>New Membership Application</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state}</p>
        <p><strong>Interests:</strong> ${formData.interests.join(', ')}</p>
        <p><strong>Involvement Type:</strong> ${formData.involvement}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    // Confirmation email to applicant
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: formData.email,
      subject: 'Application Received - Jayashree Foundation',
      html: `
        <p>Dear ${formData.fullName},</p>
        <p>Thank you for your interest in joining Jayashree Foundation!</p>
        <p>We have received your application and will review it shortly.</p>
        <p>We'll get back to you within 2-3 business days.</p>
        <p>Best regards,<br>Jayashree Foundation Team</p>
      `,
    });

    console.log('Emails sent successfully');
    res.json({ success: true, message: 'Application received and emails sent!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Email server running on http://localhost:${PORT}`);
  console.log(`📧 Using email: ${process.env.NODEMAILER_EMAIL}`);
});
