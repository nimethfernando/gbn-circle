import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL || '');
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Registering verified members...');

  const membersToEnsure = [
    {
      name: 'Rohan Sharma',
      email: 'approved.visitor@example.com',
      phone: '+91 98111 22334',
      company: 'Apex Innovations Pvt Ltd',
      designation: 'Managing Director',
      industry: 'Technology & Manufacturing',
      city: 'Mumbai',
      turnoverBand: '₹5Cr+',
      status: 'ACTIVE',
      tier: 'GBN Circle',
    },
    {
      name: 'Amit Batra',
      email: 'amitbatra105@gmail.com',
      phone: '+91 98952 89030',
      company: 'GBN Circle',
      designation: 'Founder & President',
      industry: 'Business Leadership & Networking',
      city: 'New Delhi',
      turnoverBand: '₹5Cr+',
      status: 'ACTIVE',
      tier: 'GBN Elite',
    },
  ];

  for (const m of membersToEnsure) {
    const res = await prisma.member.upsert({
      where: { email: m.email },
      update: {
        name: m.name,
        status: 'ACTIVE',
        tier: m.tier,
        company: m.company,
        designation: m.designation,
      },
      create: m,
    });
    console.log(`Success: Registered ${res.name} (${res.email}) as ${res.status} ${res.tier} member.`);
  }

  // Also make sure if there is any visitor request for Amit Batra that was rejected, we update it to APPROVED
  const amitRequests = await prisma.visitorRequest.updateMany({
    where: { email: 'amitbatra105@gmail.com' },
    data: { status: 'APPROVED' },
  });
  console.log(`Updated ${amitRequests.count} visitor requests for Amit Batra to APPROVED.`);
}

main()
  .catch((e) => {
    console.error('Error adding members:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

