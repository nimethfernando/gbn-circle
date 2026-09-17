import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/auth';
import { verifyAdminPassword } from '@/lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const validEmails = [
      (process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
      'gbncircle@gmail.com',
    ].filter(Boolean);

    if (!validEmails.includes(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyAdminPassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    const token = await createAdminSession(normalizedEmail);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    response.cookies.set('gbn_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal authentication error' },
      { status: 500 }
    );
  }
}