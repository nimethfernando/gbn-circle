import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, designation, interest, message } = body;

    // Required fields validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Full name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Save lead to database (always visible in Admin Portal -> Inquiries & Leads)
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        companyName: companyName ? companyName.trim() : null,
        designation: designation ? designation.trim() : null,
        interest: interest || 'GBN Circle',
        message: message.trim(),
      },
    });

    // 2. Dispatch notification email to GBN Circle admin team (if SMTP credentials configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const cleanPass = process.env.EMAIL_PASS.replace(/\s+/g, '');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: cleanPass,
          },
        });

        const targetAdminEmail =
          process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'gbncircle@gmail.com';

        // Send alert to Admin
        await transporter.sendMail({
          from: `"${fullName}" <${email}>`,
          sender: process.env.EMAIL_USER,
          to: targetAdminEmail,
          replyTo: `"${fullName}" <${email}>`,
          subject: `[Contact Form] ${fullName} (${email}) - ${interest || 'GBN Circle'}`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
                <span style="color: #c5a059; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">Global Business Network</span>
                <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px;">New Contact &amp; Membership Inquiry</h2>
              </div>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin-top: 0;">
                A new inquiry has been submitted through the GBN Circle website. Details are provided below:
              </p>
              
              <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #1e293b; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; width: 35%;"><strong>Full Name:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Interest / Tier:</strong></td>
                    <td style="padding: 8px 0; color: #c5a059; font-weight: 700;">${interest || 'GBN Circle'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Company:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff;">${companyName || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Designation:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff;">${designation || 'Not provided'}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 20px;">
                <strong style="color: #cbd5e1; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message:</strong>
                <div style="background: #0f172a; padding: 16px; border-radius: 8px; color: #e2e8f0; white-space: pre-wrap; border: 1px solid #1e293b; margin-top: 8px; font-size: 14px; line-height: 1.6;">${message}</div>
              </div>

              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center;">
                <p style="color: #64748b; font-size: 12px; margin-bottom: 8px;">
                  💡 Tip: Hitting <strong>"Reply"</strong> to this email in Gmail will automatically message <strong>${fullName}</strong> (${email}).
                </p>
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  This inquiry is also permanently logged in the Admin Portal under <a href="/admin/inquiries" style="color: #c5a059; text-decoration: underline;">Inquiries &amp; Leads</a>.
                </p>
              </div>
            </div>
          `,
        });

        // Also send confirmation acknowledgment to the sender
        try {
          await transporter.sendMail({
            from: `"GBN Circle" <${process.env.EMAIL_USER}>`,
            to: email,
            replyTo: targetAdminEmail,
            subject: `Thank you for contacting GBN Circle`,
            html: `
              <div style="background-color: #070b19; color: #ffffff; padding: 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
                <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
                  <span style="color: #c5a059; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">Global Business Network</span>
                  <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px;">Inquiry Received</h2>
                </div>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                  Dear ${fullName},
                </p>
                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                  Thank you for reaching out to GBN Circle regarding <strong>${interest || 'membership & partnerships'}</strong>. Our executive team has received your message and will review your inquiry shortly.
                </p>
                <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #1e293b; padding: 16px; margin: 20px 0; color: #94a3b8; font-size: 13px;">
                  <p style="margin: 0 0 8px 0; color: #cbd5e1;"><strong>Summary of your submission:</strong></p>
                  <p style="margin: 4px 0;"><strong>Full Name:</strong> ${fullName}</p>
                  <p style="margin: 4px 0;"><strong>Inquiry Topic:</strong> ${interest || 'GBN Circle'}</p>
                </div>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                  If you have any urgent queries, feel free to reply directly to this email or reach us at <a href="mailto:gbncircle@gmail.com" style="color: #c5a059;">gbncircle@gmail.com</a>.
                </p>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; color: #64748b; font-size: 11px; text-align: center;">
                  &copy; ${new Date().getFullYear()} GBN Circle &mdash; Global Business Network. All rights reserved.
                </div>
              </div>
            `,
          });
        } catch (ackError) {
          console.warn('Sender acknowledgment email skipped/failed:', ackError);
        }
      } catch (mailError) {
        console.error('Lead notification email failed to dispatch:', mailError);
      }
    } else {
      console.log(
        'Lead saved to database successfully. Note: EMAIL_USER and EMAIL_PASS environment variables are not configured, so direct email forwarding was skipped.'
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully submitted. Our team will contact you shortly.',
        data: { id: submission.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
