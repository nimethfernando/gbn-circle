import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(
  req: NextRequest,
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

    const body = await req.json().catch(() => ({}));
    const customReason = body?.reason;

    // Update status to REJECTED
    await prisma.visitorRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    // Send email notification per PRD Sec. 6 & 22
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const formattedDate = new Date(request.event.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        await transporter.sendMail({
          from: `"GBN Circle Executive Screening" <${process.env.EMAIL_USER}>`,
          to: request.email,
          subject: `Update regarding your attendance request for ${request.event.title}`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(197, 160, 89, 0.2);">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #c5a059; margin: 0; font-size: 24px; font-family: Georgia, serif; letter-spacing: 1px;">GBN CIRCLE</h1>
                <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px;">Global Business Network</p>
              </div>

              <div style="background-color: #0b1021; padding: 24px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05);">
                <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Attendance Request Status</h2>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">Dear ${request.fullName},</p>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                  Thank you for applying to attend <strong style="color: #c5a059;">${request.event.title}</strong> scheduled for <strong>${formattedDate}</strong>.
                </p>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                  Due to high delegation volume and strictly capped cohort capacities designed to maintain peer-table curation, we are unable to allocate a visitor seat for you for this specific session.
                </p>
                ${
                  customReason
                    ? `<div style="background-color: rgba(197, 160, 89, 0.08); border-left: 3px solid #c5a059; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
                         <p style="color: #f1f5f9; font-size: 13px; margin: 0; font-style: italic;">&ldquo;${customReason}&rdquo;</p>
                       </div>`
                    : ''
                }
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                  We invite you to explore other upcoming GBN Circle sessions or apply for permanent community membership to receive guaranteed boardroom priority.
                </p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="https://www.gbncircle.com/events" style="display: inline-block; background: linear-gradient(to right, #c5a059, #d4af37); color: #000000; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-right: 8px;">View Other Events</a>
                <a href="https://www.gbncircle.com/community" style="display: inline-block; background-color: transparent; border: 1px solid #c5a059; color: #c5a059; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Explore Membership</a>
              </div>

              <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 28px 0 16px 0;" />
              <div style="text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
                <p style="margin: 0;">GBN Circle &bull; Executive Admissions &amp; Visitor Screening</p>
                <p style="margin: 4px 0 0 0;">For inquiries, contact <a href="mailto:gbncircle@gmail.com" style="color: #c5a059; text-decoration: none;">gbncircle@gmail.com</a> or call <a href="tel:+919783577773" style="color: #c5a059; text-decoration: none;">+91 9783577773</a></p>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error('Failed to send rejection email notification:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Request rejected and notification email dispatched successfully'
        : 'Request rejected successfully',
      emailDispatched: emailSent,
    });
  } catch (error) {
    console.error('Reject route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reject request' },
      { status: 500 }
    );
  }
}