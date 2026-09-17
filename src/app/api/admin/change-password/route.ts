import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { verifyAdminPassword, updateAdminPassword } from '@/lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gbn_admin_session')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: 'Please enter your current password.' },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Verify current password
    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect.' },
        { status: 400 }
      );
    }

    // Update to new password
    await updateAdminPassword(newPassword);

    return NextResponse.json({
      success: true,
      message: 'Administrator password updated successfully.',
    });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update password.' },
      { status: 500 }
    );
  }
}
