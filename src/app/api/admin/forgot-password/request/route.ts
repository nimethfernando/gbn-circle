import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateOtp, setAdminResetOtp, ADMIN_PRIMARY_EMAIL } from '@/lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const normalizedEmail = (email || '').trim().toLowerCase();

    const allowedAdminEmails = [
      (process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
      ADMIN_PRIMARY_EMAIL,
    ].filter(Boolean);

    if (!allowedAdminEmails.includes(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'The provided email is not registered as an administrator.' },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP and save to database with 10 min expiry
    const otp = generateOtp();
    await setAdminResetOtp(otp, 10);

    // Send OTP email using dedicated mailer
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

        await transporter.sendMail({
          from: `"GBN Circle Security" <${process.env.EMAIL_USER}>`,
          to: ADMIN_PRIMARY_EMAIL,
          subject: `[Security Alert] Your GBN Circle Password Reset OTP: ${otp}`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 36px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
                <span style="color: #c5a059; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">Global Business Network</span>
                <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px;">Administrator Password Reset</h2>
              </div>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin-top: 0;">
                A request was made to reset the administrator password for the GBN Circle platform. Use the single-use verification code below to proceed:
              </p>

              <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #c5a059; padding: 24px; text-align: center; margin: 28px 0;">
                <span style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; display: block; margin-bottom: 8px;">Verification Code (OTP)</span>
                <span style="color: #c5a059; font-size: 38px; font-family: monospace; font-weight: 800; letter-spacing: 8px;">${otp}</span>
                <span style="color: #64748b; font-size: 11px; display: block; margin-top: 8px;">Valid for 10 minutes</span>
              </div>

              <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                If you did not initiate this password reset request, please ignore this email. Your current administrator password will remain unchanged.
              </p>

              <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #1e293b; color: #64748b; font-size: 11px; text-align: center;">
                &copy; ${new Date().getFullYear()} GBN Circle &mdash; Security &amp; Access Control
              </div>
            </div>
          `,
        });
      } catch (mailError) {
        console.error('Failed to send OTP email via nodemailer:', mailError);
        return NextResponse.json(
          { success: false, message: 'Failed to send OTP email. Please ensure mail server configuration is active.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS missing in environment. OTP generated:', otp);
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${ADMIN_PRIMARY_EMAIL}.`,
    });
  } catch (error) {
    console.error('Error in forgot-password/request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process password reset request.' },
      { status: 500 }
    );
  }
}
