import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export const ADMIN_PRIMARY_EMAIL = 'gbncircle@gmail.com';
const SECURITY_SLUG = 'admin_security';

export interface AdminSecurityData {
  passwordHash?: string;
  otp?: string;
  otpExpiry?: number;
  lastChangedAt?: string;
}

/**
 * Hash password using salt + Node crypto scrypt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Generate 6-digit numeric OTP
 */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Fetch admin security record from PageContent store
 */
export async function getAdminSecurityRecord(): Promise<AdminSecurityData> {
  try {
    const row = await prisma.pageContent.findUnique({
      where: { slug: SECURITY_SLUG },
    });
    if (!row || !row.data) return {};
    return JSON.parse(row.data) as AdminSecurityData;
  } catch (err) {
    console.error('Error fetching admin security record:', err);
    return {};
  }
}

/**
 * Persist admin security record to PageContent store
 */
async function saveAdminSecurityRecord(data: AdminSecurityData): Promise<void> {
  const jsonStr = JSON.stringify(data);
  await prisma.pageContent.upsert({
    where: { slug: SECURITY_SLUG },
    create: {
      slug: SECURITY_SLUG,
      title: 'Admin Security Credentials',
      data: jsonStr,
    },
    update: {
      data: jsonStr,
    },
  });
}

/**
 * Verify if the entered password matches either the custom hashed password or default fallback
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const record = await getAdminSecurityRecord();

  // If a custom password has been saved to the database, verify against its hash
  if (record.passwordHash) {
    return verifyPassword(password, record.passwordHash);
  }

  // Fallback to environment variable or standard initial default
  const defaultPassword = process.env.ADMIN_PASSWORD || 'supersecretadminpassword123';
  return password === defaultPassword;
}

/**
 * Update the admin password
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.passwordHash = hashPassword(newPassword);
  record.lastChangedAt = new Date().toISOString();
  record.otp = undefined;
  record.otpExpiry = undefined;
  await saveAdminSecurityRecord(record);
}

/**
 * Store an OTP for admin password reset (expires in expiryMinutes, default 10)
 */
export async function setAdminResetOtp(otp: string, expiryMinutes = 10): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.otp = otp;
  record.otpExpiry = Date.now() + expiryMinutes * 60 * 1000;
  await saveAdminSecurityRecord(record);
}

/**
 * Verify if entered OTP is valid and unexpired
 */
export async function verifyAdminResetOtp(enteredOtp: string): Promise<{ valid: boolean; error?: string }> {
  const record = await getAdminSecurityRecord();
  if (!record.otp || !record.otpExpiry) {
    return { valid: false, error: 'No active password reset request found. Please request a new code.' };
  }

  if (Date.now() > record.otpExpiry) {
    return { valid: false, error: 'This OTP has expired. Please request a new verification code.' };
  }

  if (record.otp.trim() !== enteredOtp.trim()) {
    return { valid: false, error: 'Invalid verification code. Please check your email.' };
  }

  return { valid: true };
}

/**
 * Invalidate current OTP
 */
export async function clearAdminResetOtp(): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.otp = undefined;
  record.otpExpiry = undefined;
  await saveAdminSecurityRecord(record);
}
