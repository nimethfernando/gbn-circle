import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/auth';

export async function POST() {
  await clearAdminSession();
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('gbn_admin_session');
  return response;
}