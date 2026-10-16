import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const tier = searchParams.get('tier')?.trim();
    const status = searchParams.get('status')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10', 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.MemberWhereInput = {};

    if (tier && tier !== 'ALL') {
      where.tier = { equals: tier };
    }

    if (status && status !== 'ALL') {
      where.status = { equals: status };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
        { designation: { contains: search } },
        { city: { contains: search } },
        { industry: { contains: search } },
      ];
    }

    const [members, totalCount, totalActive, totalElite, totalCircle] = await Promise.all([
      prisma.member.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.member.count({ where }),
      prisma.member.count({ where: { status: 'ACTIVE' } }),
      prisma.member.count({ where: { tier: 'GBN Elite', status: 'ACTIVE' } }),
      prisma.member.count({ where: { tier: 'GBN Circle', status: 'ACTIVE' } }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        members,
        pagination: {
          totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        metrics: {
          totalCount,
          totalActive,
          totalElite,
          totalCircle,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching admin members:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve members list' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      designation,
      industry,
      tier,
      city,
      turnoverBand,
      status,
      linkedIn,
    } = body;

    if (!name || !email || !company || !designation) {
      return NextResponse.json(
        { success: false, message: 'Name, email, company, and designation are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const member = await prisma.member.upsert({
      where: { email: cleanEmail },
      update: {
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        company: company.trim(),
        designation: designation.trim(),
        industry: industry ? industry.trim() : 'Business & Services',
        tier: tier || 'GBN Circle',
        city: city ? city.trim() : 'India',
        turnoverBand: turnoverBand || '₹20L - ₹1Cr',
        status: status || 'ACTIVE',
        linkedIn: linkedIn ? linkedIn.trim() : null,
      },
      create: {
        name: name.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : null,
        company: company.trim(),
        designation: designation.trim(),
        industry: industry ? industry.trim() : 'Business & Services',
        tier: tier || 'GBN Circle',
        city: city ? city.trim() : 'India',
        turnoverBand: turnoverBand || '₹20L - ₹1Cr',
        status: status || 'ACTIVE',
        linkedIn: linkedIn ? linkedIn.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Member ${member.name} (${member.email}) successfully saved`,
      data: member,
    });
  } catch (error) {
    console.error('Error creating/updating member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save member details' },
      { status: 500 }
    );
  }
}
