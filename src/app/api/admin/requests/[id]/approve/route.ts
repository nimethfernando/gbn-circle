import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    await prisma.visitorRequest.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"GBN Circle" <gbncircle@gmail.com>',
      to: request.email,
      subject: `Approved: Attendance Access for ${request.event.title}`,
      html: `
        <div style="background-color: #070b19; color: #ffffff; padding: 24px; font-family: sans-serif;">
          <h2 style="color: #c5a059;">Your Request Has Been Approved</h2>
          <p>Dear ${request.fullName},</p>
          <p>Your request to attend <strong>${request.event.title}</strong> has been approved by the GBN administration.</p>
          <hr style="border: 1px solid #1e293b;" />
          <p><strong>Date:</strong> ${request.event.date.toISOString().split('T')[0]}</p>
          <p><strong>Time:</strong> ${request.event.startTime} - ${request.event.endTime} (${request.event.timezone})</p>
          ${
            request.event.format === 'ONLINE'
              ? `<p><strong>Private Meeting Link:</strong> <a href="${request.event.privateMeetingLink}" style="color: #c5a059;">Join Meeting</a></p>
                 <p><strong>Meeting ID:</strong> ${request.event.meetingId || 'N/A'}</p>
                 <p><strong>Passcode:</strong> ${request.event.passcode || 'None'}</p>`
              : `<p><strong>Venue:</strong> ${request.event.venueName}, ${request.event.venueCity}</p>`
          }
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Request approved and email sent' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process approval' },
      { status: 500 }
    );
  }
}