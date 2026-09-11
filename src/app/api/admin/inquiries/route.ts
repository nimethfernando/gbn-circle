import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status')?.trim().toUpperCase();
    const search = searchParams.get('search')?.trim();

    const where: Prisma.ContactSubmissionWhereInput = {};

    if (status && status !== 'ALL') {
      where.status = { equals: status };
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { companyName: { contains: search } },
        { designation: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const inquiries = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve contact inquiries' },
      { status: 500 }
    );
  }
}
