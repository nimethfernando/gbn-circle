import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const request = await prisma.visitorRequest.findUnique({
      where: { id },
      include: { event: true },
    });

    if (!request) {
      return NextResponse.json(
        { success: false, message: 'Request not found' },
        { status: 404 }
      );
    }

    // Update status to APPROVED
    await prisma.visitorRequest.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    // Send email with credentials if SMTP environment variables exist
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

        const formattedDate = new Date(request.event.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        await transporter.sendMail({
          from: `"GBN Circle" <${process.env.EMAIL_USER}>`,
          to: request.email,
          replyTo: 'gbncircle@gmail.com',
          subject: `Pass Approved: Attendance Access for ${request.event.title} | GBN Circle`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
              <!-- Header -->
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; text-align: center;">
                <span style="color: #c5a059; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">Global Business Network</span>
                <h1 style="color: #34d399; margin: 10px 0 0 0; font-size: 22px; font-weight: 700;">Invitation Pass Approved</h1>
              </div>

              <!-- Greeting -->
              <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-top: 0;">
                Dear <strong>${request.fullName}</strong>,
              </p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                Congratulations. Your visitor pass application to attend <strong style="color: #c5a059;">${request.event.title}</strong> has been officially approved by the GBN Circle executive committee.
              </p>

              <!-- Credentials Card -->
              <div style="background-color: #0f172a; border-radius: 10px; border: 1px solid #10b981/40; padding: 22px; margin: 24px 0;">
                <p style="margin: 0 0 14px 0; color: #34d399; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Your Session Credentials</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 30%;"><strong>Session:</strong></td>
                    <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${request.event.title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Date:</strong></td>
                    <td style="padding: 6px 0; color: #e2e8f0;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Time:</strong></td>
                    <td style="padding: 6px 0; color: #e2e8f0;">${request.event.startTime} - ${request.event.endTime} (${request.event.timezone})</td>
                  </tr>
                  ${
                    request.event.format.toLowerCase() === 'online'
                      ? `
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Meeting ID:</strong></td>
                    <td style="padding: 6px 0; color: #ffffff; font-family: monospace; font-size: 14px; font-weight: bold;">${request.event.meetingId || 'Shared by Host'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Passcode:</strong></td>
                    <td style="padding: 6px 0; color: #c5a059; font-family: monospace; font-size: 14px; font-weight: bold;">${request.event.passcode || 'None'}</td>
                  </tr>
                      `
                      : `
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Venue:</strong></td>
                    <td style="padding: 6px 0; color: #ffffff;">${request.event.venueName || ''}, ${request.event.venueAddress || ''}, ${request.event.venueCity || ''}</td>
                  </tr>
                      `
                  }
                </table>

                ${
                  request.event.format.toLowerCase() === 'online' && request.event.privateMeetingLink
                    ? `
                <div style="margin-top: 20px; text-align: center;">
                  <a href="${request.event.privateMeetingLink}" style="display: inline-block; background-color: #c5a059; color: #000000; font-weight: bold; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                    Join Private Meeting
                  </a>
                </div>
                    `
                    : ''
                }
              </div>

              <!-- Important Protocols -->
              <div style="background-color: rgba(15, 23, 42, 0.6); border: 1px solid #1e293b; border-radius: 8px; padding: 14px; margin: 20px 0;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                  ⚠️ <strong>Notice:</strong> This invitation is strictly personal and non-transferable. Please join 5 minutes prior to the start time in business attire with video active.
                </p>
              </div>

              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px;">
                <p style="margin: 0 0 6px 0;">Support Desk: <a href="mailto:gbncircle@gmail.com" style="color: #c5a059; text-decoration: none;">gbncircle@gmail.com</a></p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} GBN Circle &mdash; Global Business Network. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send approval email notification:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Request approved successfully and credentials dispatched via email',
    });
  } catch (error) {
    console.error('Approval route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process approval' },
      { status: 500 }
    );
  }
}