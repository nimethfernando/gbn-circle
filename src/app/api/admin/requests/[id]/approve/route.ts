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

    // Update status to APPROVED
    await prisma.visitorRequest.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    // Send email with credentials if SMTP environment variables exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"GBN Circle" <${process.env.EMAIL_USER}>`,
          to: request.email,
          subject: `Approved: Attendance Access for ${request.event.title}`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 24px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px;">
              <h2 style="color: #c5a059; margin-top: 0;">Attendance Request Approved</h2>
              <p>Dear ${request.fullName},</p>
              <p>Your request to attend <strong>${request.event.title}</strong> has been approved by the GBN administration.</p>
              <hr style="border: none; border-top: 1px solid #1e293b; margin: 20px 0;" />
              <p><strong>Date:</strong> ${new Date(request.event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${request.event.startTime} - ${request.event.endTime} (${request.event.timezone})</p>
              ${
                request.event.format.toLowerCase() === 'online'
                  ? `<p><strong>Meeting Access Link:</strong> <a href="${request.event.privateMeetingLink || '#'}" style="color: #c5a059; text-decoration: underline;">Join Meeting</a></p>
                     <p><strong>Meeting ID:</strong> ${request.event.meetingId || 'Provided via session host'}</p>
                     <p><strong>Passcode:</strong> ${request.event.passcode || 'None'}</p>`
                  : `<p><strong>Venue:</strong> ${request.event.venueName || ''}, ${request.event.venueAddress || ''}, ${request.event.venueCity || ''}</p>`
              }
              <hr style="border: none; border-top: 1px solid #1e293b; margin: 20px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">This is a private, non-transferable invitation from GBN Circle.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send approval email notification:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Request approved successfully',
    });
  } catch (error) {
    console.error('Approval route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process approval' },
      { status: 500 }
    );
  }
}