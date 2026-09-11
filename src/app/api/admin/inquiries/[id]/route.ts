import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['NEW', 'CONTACTED', 'ARCHIVED'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json(
        { success: false, message: 'Invalid inquiry status' },
        { status: 400 }
      );
    }

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
