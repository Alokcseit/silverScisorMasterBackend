// src/utils/sendEmail.js

import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// Email Templates
export const resetPasswordEmailTemplate = (
  username,
  resetUrl
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #f43f5e, #f59e0b); padding: 20px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0;">Silverscisor</h1>
    </div>
    <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px;">
      <h2 style="color: #1f2937;">Hi ${username},</h2>
      <p style="color: #4b5563;">
        You requested a password reset. Click the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}"
          style="
            background: linear-gradient(135deg, #f43f5e, #f59e0b);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
          ">
          Reset Password
        </a>
      </div>

      <p style="color: #6b7280; font-size: 14px;">
        This link expires in <strong>1 hour</strong>.
        If you didn't request this, please ignore this email.
      </p>

      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />

      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        Silverscisor &copy; 2026. All rights reserved.
      </p>
    </div>
  </div>
`;

export const bookingConfirmEmailTemplate = (
  username,
  bookingDetails
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #f43f5e, #f59e0b); padding: 20px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
    </div>

    <div style="padding: 30px; background: #f9fafb;">
      <h2>Hi ${username},</h2>
      <p>Your appointment has been confirmed.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; color: #6b7280;">Service:</td>
          <td style="padding: 8px; font-weight: bold;">
            ${bookingDetails.service}
          </td>
        </tr>

        <tr style="background: #f3f4f6;">
          <td style="padding: 8px; color: #6b7280;">Date:</td>
          <td style="padding: 8px; font-weight: bold;">
            ${bookingDetails.date}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px; color: #6b7280;">Time:</td>
          <td style="padding: 8px; font-weight: bold;">
            ${bookingDetails.time}
          </td>
        </tr>

        <tr style="background: #f3f4f6;">
          <td style="padding: 8px; color: #6b7280;">Amount:</td>
          <td style="padding: 8px; font-weight: bold; color: #f43f5e;">
            ₹${bookingDetails.price}
          </td>
        </tr>
      </table>
    </div>
  </div>
`;