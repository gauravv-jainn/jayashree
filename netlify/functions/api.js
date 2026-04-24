import serverless from 'serverless-http';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

router.post('/forms/join-ngo', async (req, res) => {
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

    res.json({ success: true, message: 'Application received and emails sent!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use('/api/', router);
app.use('/.netlify/functions/api/', router);

export const handler = serverless(app);
