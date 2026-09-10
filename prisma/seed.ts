import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.visitorRequest.deleteMany();
  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: 'GBN Circle National Virtual Meet',
        type: 'Online Networking',
        tier: 'GBN Circle',
        format: 'Online',
        date: new Date('2026-10-15T09:00:00Z'),
        startTime: '09:00 AM',
        endTime: '11:00 AM',
        timezone: 'IST',
        image: '/event-networking-BdmXOEy2 (1).jpg',
        shortDescription: 'Structured business networking session for founders, partners, and senior leaders across India.',
        eligibility: 'Founders, MDs, Partners, CXOs with ₹20L+ annual turnover.',
        allowVisitorRequests: true,
        fee: 'Free (Invite Only)',
        privateMeetingLink: 'https://zoom.us/j/9876543210',
        meetingId: '987 654 3210',
        passcode: 'GBN2026',
        status: 'PUBLISHED',
      },
      {
        title: 'GBN Elite Executive Morning',
        type: 'Exclusive Mastermind',
        tier: 'GBN Elite',
        format: 'Online',
        date: new Date('2026-10-22T08:30:00Z'),
        startTime: '08:30 AM',
        endTime: '10:30 AM',
        timezone: 'IST',
        image: '/event-leadership-C1eE1_9Q (1).jpg',
        shortDescription: 'High-table strategic dialogue for large enterprise leaders and seasoned entrepreneurs.',
        eligibility: 'Strictly founders & MDs with ₹5Cr+ annual turnover.',
        allowVisitorRequests: true,
        fee: 'Complimentary for approved visitors',
        privateMeetingLink: 'https://zoom.us/j/1234567890',
        meetingId: '123 456 7890',
        passcode: 'ELITE2026',
        status: 'PUBLISHED',
      },
      {
        title: 'GBN Physical Chapter Meet — Bengaluru',
        type: 'In-Person Summit',
        tier: 'GBN Circle',
        format: 'In-Person',
        date: new Date('2026-10-28T18:00:00Z'),
        startTime: '06:00 PM',
        endTime: '09:00 PM',
        timezone: 'IST',
        image: '/event-global-CKOLaEg2 (1).jpg',
        shortDescription: 'An evening of high-impact introductions, sector collaborations, and dinner.',
        eligibility: 'Verified business owners and approved corporate attendees.',
        venueName: 'The Leela Palace',
        venueAddress: '23 HAL Old Airport Rd, Kodihalli',
        venueCity: 'Bengaluru',
        venueCountry: 'India',
        allowVisitorRequests: true,
        fee: '₹1,500 Cover (Dinner included)',
        status: 'PUBLISHED',
      },
    ],
  });

  console.log('Database seeded with initial events.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });