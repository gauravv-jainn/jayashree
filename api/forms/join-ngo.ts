import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, address, city, state, interests, involvement, message } = req.body;

    // Create email template
    const emailBody = `
      <h2>New Membership Application</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state}</p>
      <p><strong>Interests:</strong> ${interests.join(', ')}</p>
      <p><strong>Involvement Type:</strong> ${involvement}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email to organization
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL, // Send to organization's email
      subject: `New Membership Application from ${fullName}`,
      html: emailBody,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Application Received - Jayashree Foundation',
      html: `
        <p>Dear ${fullName},</p>
        <p>Thank you for your interest in joining Jayashree Foundation!</p>
        <p>We have received your application and will review it shortly.</p>
        <p>We'll get back to you within 2-3 business days.</p>
        <p>Best regards,<br>Jayashree Foundation Team</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
}
