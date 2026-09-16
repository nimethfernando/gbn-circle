import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawConnectionString = process.env.DATABASE_URL || '';
const connectionString = rawConnectionString.replace(/^mysql:\/\//, 'mariadb://');
const adapter = new PrismaMariaDb(connectionString);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;