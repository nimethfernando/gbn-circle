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

    // 1. Save lead to SQLite
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        companyName: companyName || null,
        designation: designation || null,
        interest: interest || 'General Inquiry',
        message,
      },
    });

    // 2. Dispatch notification email to GBN Circle admin team (if SMTP is configured)
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
          from: `"GBN Platform Alert" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `[New Lead] Inquiry from ${fullName} (${interest || 'General'})`,
          html: `
            <div style="background-color: #070b19; color: #ffffff; padding: 24px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px;">
              <h2 style="color: #c5a059; margin-top: 0;">New Contact Inquiry Received</h2>
              <p>A new potential member or partner reached out through the GBN Circle platform.</p>
              <hr style="border: none; border-top: 1px solid #1e293b; margin: 16px 0;" />
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #c5a059;">${email}</a></p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
              <p><strong>Designation:</strong> ${designation || 'Not provided'}</p>
              <p><strong>Area of Interest:</strong> ${interest || 'General Inquiry'}</p>
              <hr style="border: none; border-top: 1px solid #1e293b; margin: 16px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #0f172a; padding: 12px; border-radius: 6px; color: #cbd5e1; white-space: pre-wrap;">${message}</p>
            </div>
          `,
        });
      } catch (mailError) {
        console.error('Lead notification email failed to dispatch:', mailError);
      }
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