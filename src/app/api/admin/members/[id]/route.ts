import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Member ID is required' },
        { status: 400 }
      );
    }

    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }

    await prisma.member.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: `Member "${existing.name}" (${existing.email}) successfully deleted`,
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete member' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Member ID is required' },
        { status: 400 }
      );
    }

    const updated = await prisma.member.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name.trim() }),
        ...(body.email && { email: body.email.trim().toLowerCase() }),
        ...(body.phone !== undefined && { phone: body.phone ? body.phone.trim() : null }),
        ...(body.company && { company: body.company.trim() }),
        ...(body.designation && { designation: body.designation.trim() }),
        ...(body.industry && { industry: body.industry.trim() }),
        ...(body.tier && { tier: body.tier }),
        ...(body.city && { city: body.city.trim() }),
        ...(body.turnoverBand && { turnoverBand: body.turnoverBand }),
        ...(body.status && { status: body.status }),
        ...(body.linkedIn !== undefined && { linkedIn: body.linkedIn ? body.linkedIn.trim() : null }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update member' },
      { status: 500 }
    );
  }
}
