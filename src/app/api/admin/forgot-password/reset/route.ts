import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminResetOtp, updateAdminPassword, clearAdminResetOtp } from '@/lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const { otp, newPassword } = await req.json();

    if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 6-digit verification code.' },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Verify OTP
    const check = await verifyAdminResetOtp(otp.trim());
    if (!check.valid) {
      return NextResponse.json(
        { success: false, message: check.error || 'Invalid or expired verification code.' },
        { status: 400 }
      );
    }

    // Update password in database
    await updateAdminPassword(newPassword);

    // Clear used OTP
    await clearAdminResetOtp();

    return NextResponse.json({
      success: true,
      message: 'Your administrator password has been updated successfully. You can now sign in.',
    });
  } catch (error) {
    console.error('Error resetting admin password:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}

