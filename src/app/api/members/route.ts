import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry')?.trim();
    const tier = searchParams.get('tier')?.trim();
    const search = searchParams.get('search')?.trim();

    const where: Prisma.MemberWhereInput = {
      status: 'ACTIVE',
    };

    if (industry && industry !== 'All' && industry !== 'All Sectors') {
      where.industry = { equals: industry };
    }

    if (tier && tier !== 'All') {
      where.tier = { equals: tier };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { designation: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve members directory' },
      { status: 500 }
    );
  }
}
