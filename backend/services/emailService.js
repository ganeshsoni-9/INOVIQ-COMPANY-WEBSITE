import nodemailer from 'nodemailer';

let transporter = null;

const initTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log('[EmailService] SMTP Transporter configured.');
    } catch (err) {
      console.warn('[EmailService] Failed to initialize SMTP:', err.message);
      transporter = null;
    }
  } else {
    // Graceful no-op when email credentials are not set
    transporter = null;
  }
};

initTransporter();

/**
 * Send notification to company admin about new customer inquiry
 */
export const sendAdminInquiryNotification = async (inquiry) => {
  if (!transporter) {
    return { sent: false, reason: 'SMTP not configured in environment.' };
  }

  const recipient =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.COMPANY_EMAIL ||
    'inquiries@INOVIQglobal.com';

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'INOVIQ GLOBAL'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: recipient,
    subject: `🔔 New Inquiry: ${inquiry.referenceNumber} - ${inquiry.fullName} (${inquiry.serviceCategory})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0066FF; margin-top: 0;">New Business Inquiry Received</h2>
        <p><strong>Reference Number:</strong> <span style="background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${inquiry.referenceNumber}</span></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
        <p><strong>Client Name:</strong> ${inquiry.fullName}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        ${inquiry.companyName ? `<p><strong>Company:</strong> ${inquiry.companyName}</p>` : ''}
        <p><strong>Category:</strong> ${inquiry.serviceCategory}</p>
        ${inquiry.specificService ? `<p><strong>Specific Service:</strong> ${inquiry.specificService}</p>` : ''}
        <p><strong>Estimated Budget:</strong> ${inquiry.estimatedBudget || 'Not specified'}</p>
        <p><strong>Expected Timeline:</strong> ${inquiry.expectedTimeline || 'Not specified'}</p>
        <p><strong>Preferred Contact:</strong> ${inquiry.preferredContactMethod.toUpperCase()}</p>
        <div style="background: #f8fafc; padding: 12px; border-left: 4px solid #0066FF; margin: 15px 0;">
          <strong>Requirements:</strong>
          <p style="white-space: pre-line; margin: 5px 0 0 0;">${inquiry.projectDescription}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
          Received on: ${new Date(inquiry.createdAt).toLocaleString()} | Log into the Admin Dashboard to manage this inquiry.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`[EmailService] Admin notification failed to send:`, error.message);
    return { sent: false, error: error.message };
  }
};

/**
 * Send customer acknowledgement receipt
 */
export const sendCustomerAcknowledgement = async (inquiry) => {
  if (!transporter) {
    return { sent: false, reason: 'SMTP not configured in environment.' };
  }

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'INOVIQ GLOBAL PVT. LTD.'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: inquiry.email,
    subject: `Inquiry Received: ${inquiry.referenceNumber} - INOVIQ GLOBAL PVT. LTD.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0A192F;">Thank you for contacting INOVIQ GLOBAL PVT. LTD.</h2>
        <p>Dear ${inquiry.fullName},</p>
        <p>We have successfully received your service inquiry. Our digital specialists are reviewing your requirements and will reach out to you shortly via your preferred channel (<strong>${inquiry.preferredContactMethod.toUpperCase()}</strong>).</p>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 5px 0; font-size: 13px; color: #475569;">Your Unique Reference Number:</p>
          <p style="margin: 0; font-size: 20px; font-weight: bold; color: #0066FF; letter-spacing: 1px;">${inquiry.referenceNumber}</p>
        </div>

        <p><strong>Selected Category:</strong> ${inquiry.serviceCategory}</p>
        ${inquiry.specificService ? `<p><strong>Service:</strong> ${inquiry.specificService}</p>` : ''}

        <p>If you have any urgent queries, feel free to reply to this email or reach us at <a href="mailto:${process.env.COMPANY_EMAIL || 'info@inoviqglobal.com'}">${process.env.COMPANY_EMAIL || 'info@inoviqglobal.com'}</a>.</p>

        <p style="margin-top: 30px;">Best regards,<br />
        <strong>INOVIQ GLOBAL PVT. LTD.</strong><br />
        <span style="color: #64748b; font-size: 13px;">Ideas Into Impact. Digital Solutions That Grow Your Business.</span>
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`[EmailService] Customer acknowledgement failed to send:`, error.message);
    return { sent: false, error: error.message };
  }
};
