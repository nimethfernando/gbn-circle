import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventId,
      fullName,
      email,
      phone,
      country,
      city,
      companyName,
      designation,
      industry,
      website,
      linkedIn,
      whyAttend,
      collaborationGoals,
    } = body;

    if (!eventId || !fullName || !email || !phone || !companyName) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || !event.allowVisitorRequests || event.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, message: 'This event is not accepting visitor requests' },
        { status: 403 }
      );
    }

    const newRequest = await prisma.visitorRequest.create({
      data: {
        eventId,
        fullName,
        email: email.trim().toLowerCase(),
        phone,
        country: country || 'India',
        city: city || '',
        companyName,
        designation: designation || '',
        industry: industry || '',
        website: website || '',
        linkedIn: linkedIn || '',
        whyAttend: whyAttend || '',
        collaborationGoals: collaborationGoals || '',
      },
    });

    // Dispatch Confirmation Email to User and Alert to Admin if SMTP credentials exist
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

        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        // 1. Send confirmation acknowledgment email to the applicant
        await transporter.sendMail({
          from: `"GBN Circle" <${process.env.EMAIL_USER}>`,
          to: email.trim().toLowerCase(),
          replyTo: 'gbncircle@gmail.com',
          subject: `Attendance Request Received: ${event.title} | GBN Circle`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
              <!-- Header -->
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; text-align: center;">
                <span style="color: #c5a059; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">Global Business Network</span>
                <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 22px; font-weight: 700;">Pass Application Received</h1>
              </div>

              <!-- Greeting -->
              <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-top: 0;">
                Dear <strong>${fullName}</strong>,
              </p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                Thank you for applying to attend <strong style="color: #c5a059;">${event.title}</strong>. Your request has been recorded and is currently under review by our executive screening committee.
              </p>

              <!-- Session Details Card -->
              <div style="background-color: #0f172a; border-radius: 10px; border: 1px solid #1e293b; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; color: #c5a059; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Session Details</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 30%;"><strong>Event:</strong></td>
                    <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${event.title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Date:</strong></td>
                    <td style="padding: 6px 0; color: #e2e8f0;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Time:</strong></td>
                    <td style="padding: 6px 0; color: #e2e8f0;">${event.startTime} - ${event.endTime} (${event.timezone})</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Format:</strong></td>
                    <td style="padding: 6px 0; color: #e2e8f0;">${event.format} ${event.format.toLowerCase() === 'online' ? '(Private VIP Zoom Session)' : ''}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;"><strong>Status:</strong></td>
                    <td style="padding: 6px 0;">
                      <span style="background-color: #451a03; color: #fbbf24; border: 1px solid #78350f; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">Under Review</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps Notice -->
              <div style="background-color: rgba(197, 160, 89, 0.08); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                  🔒 <strong>What happens next:</strong> Once our committee reviews your company profile and mutual sector alignment, you will receive an official approval email with private meeting links and passcodes.
                </p>
              </div>

              <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                You can also check your pass status at any time by returning to the event page and entering your email address: <strong style="color: #ffffff;">${email.trim().toLowerCase()}</strong>.
              </p>

              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px;">
                <p style="margin: 0 0 6px 0;">Need immediate assistance? Contact <a href="mailto:gbncircle@gmail.com" style="color: #c5a059; text-decoration: none;">gbncircle@gmail.com</a></p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} GBN Circle &mdash; Global Business Network. All rights reserved.</p>
              </div>
            </div>
          `,
        });

        // 2. Send notification email to GBN Circle admin team
        await transporter.sendMail({
          from: `"GBN Circle Passes" <${process.env.EMAIL_USER}>`,
          to: 'gbncircle@gmail.com',
          replyTo: `"${fullName}" <${email}>`,
          subject: `[New Visitor Application] ${fullName} (${companyName}) - ${event.title}`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 28px 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; border: 1px solid #1e293b;">
              <h2 style="color: #c5a059; margin-top: 0; font-size: 20px;">New Event Visitor Pass Request</h2>
              <p style="color: #94a3b8; font-size: 13px;">A new visitor pass application has been submitted for review:</p>
              
              <div style="background: #0f172a; padding: 16px; border-radius: 8px; border: 1px solid #1e293b; margin: 16px 0; font-size: 13px;">
                <p style="margin: 4px 0;"><strong>Applicant:</strong> ${fullName}</p>
                <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
                <p style="margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 4px 0;"><strong>Company:</strong> ${companyName} (${designation || 'N/A'})</p>
                <p style="margin: 4px 0;"><strong>Industry / City:</strong> ${industry || 'N/A'} - ${city || 'N/A'}</p>
                <p style="margin: 4px 0;"><strong>Target Event:</strong> <span style="color: #c5a059; font-weight: 700;">${event.title}</span></p>
                <p style="margin: 8px 0 0 0; color: #cbd5e1;"><strong>Why Attend:</strong> &quot;${whyAttend || 'Not provided'}&quot;</p>
              </div>

              <p style="font-size: 13px; color: #94a3b8;">
                Log into the Admin Portal at <a href="/admin/events" style="color: #c5a059; font-weight: bold;">/admin/events</a> to <strong>Approve</strong>, <strong>Reject</strong>, or <strong>Delete</strong> this application.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to dispatch visitor request emails:', emailError);
        // Continue returning success so visitor registration in DB is not blocked
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Request submitted successfully. A confirmation email has been sent to your inbox.',
      requestId: newRequest.id,
    });
  } catch (err) {
    console.error('Error submitting visitor request:', err);
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
}