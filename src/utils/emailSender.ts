// Simple email sending utility
// This will send form data to the backend for email processing

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export async function sendJoinNGOEmail(formData: any) {
  try {
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

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
