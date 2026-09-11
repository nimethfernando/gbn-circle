import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing existing data...');
  await prisma.visitorRequest.deleteMany();
  await prisma.event.deleteMany();

  console.log('Seeding events with PRD Section 23 rich data...');

  const event1 = await prisma.event.create({
    data: {
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
      fullDescription: 'Join the premier bi-monthly gathering of the GBN Circle national community. This interactive session connects high-calibre business leaders, founders, and decision-makers for cross-sector business referrals, strategic joint ventures, and market expansion opportunities.',
      eligibility: 'Founders, MDs, Partners, CXOs with ₹20L+ annual turnover.',
      allowVisitorRequests: true,
      fee: 'Free (Invite Only)',
      capacity: 100,
      speakerHost: 'Amit Batra — Founder & President, GBN Circle',
      supportContact: 'gbncircle@gmail.com / +91 9783577773',
      agenda: `09:00 AM — Welcome & Executive Opening Remarks
09:15 AM — Member Introductions & Strategic Highlights
09:45 AM — 2–3 Focused Business Presentations
10:15 AM — Interactive Strategic Roundtable & Discussion
10:45 AM — Networking & Opportunity Exchange
11:00 AM — Closing & Collaboration Next Steps`,
      whatToExpect: `Welcome & Opening
Member Introductions
2–3 Business Presentations
Interaction
Networking & Opportunity Exchange
Closing`,
      additionalInfo: 'Please ensure high-speed internet and working video/microphone. Business formals required.',
      privateMeetingLink: 'https://zoom.us/j/9876543210',
      meetingId: '987 654 3210',
      passcode: 'GBN2026',
      status: 'PUBLISHED',
    },
  });

  await prisma.event.create({
    data: {
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
      fullDescription: 'An invitation-only strategic mastermind designed exclusively for enterprise founders and C-level leaders steering high-growth organizations. Dive into collaborative discussions on M&A, cross-border scale, and capital efficiency.',
      eligibility: 'Strictly founders & MDs with ₹5Cr+ annual turnover.',
      allowVisitorRequests: true,
      fee: 'Complimentary for approved visitors',
      capacity: 35,
      speakerHost: 'Dr. Rajesh Kothari — Senior Director, GBN Elite Board',
      supportContact: 'gbncircle@gmail.com / +91 9783577773',
      agenda: `08:30 AM — Executive Arrival & Private Welcome
08:45 AM — Keynote Dialogue: Scaling Through Market Volatility
09:15 AM — Closed-Door Roundtable Discussion
09:55 AM — Synergistic Collaboration & Direct Intros
10:30 AM — Executive Wrap-up & Adjournment`,
      whatToExpect: `Welcome & Opening
Member Introductions
2–3 Business Presentations
Interaction
Networking & Opportunity Exchange
Closing`,
      additionalInfo: 'Confidentiality agreement applies to all participants.',
      privateMeetingLink: 'https://zoom.us/j/1234567890',
      meetingId: '123 456 7890',
      passcode: 'ELITE2026',
      status: 'PUBLISHED',
    },
  });

  await prisma.event.create({
    data: {
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
      fullDescription: 'The Bengaluru Chapter physical meet brings together leading tech founders, industrialists, and service leaders under one roof at The Leela Palace for curated networking followed by a 3-course executive dinner.',
      eligibility: 'Verified business owners and approved corporate attendees.',
      venueName: 'The Leela Palace',
      venueAddress: '23 HAL Old Airport Rd, Kodihalli',
      venueCity: 'Bengaluru',
      venueCountry: 'India',
      allowVisitorRequests: true,
      fee: '₹1,500 Cover (Dinner included)',
      capacity: 75,
      speakerHost: 'Sanjay Nair — Regional Director, South India Chapter',
      supportContact: 'gbncircle@gmail.com / +91 9783577773',
      agenda: `06:00 PM — Registration & Welcome Refreshments
06:30 PM — Chapter President Address & Strategic Themes
07:00 PM — Structured Table Rotations & 60s Introductions
08:00 PM — Networking Reception & Business Deal Exchange
08:30 PM — Networking Dinner & Informal Connects`,
      whatToExpect: `Welcome & Opening
Member Introductions
2–3 Business Presentations
Interaction
Networking & Opportunity Exchange
Closing`,
      additionalInfo: 'Valet parking available at venue. Business formal dress code.',
      status: 'PUBLISHED',
    },
  });

  // Create one past event to test past event categorization
  await prisma.event.create({
    data: {
      title: 'GBN Global Trade & Expansion Conclave 2025',
      type: 'Annual Summit',
      tier: 'GBN Circle',
      format: 'Online',
      date: new Date('2025-11-15T10:00:00Z'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      timezone: 'IST',
      image: '/event-networking-BdmXOEy2 (1).jpg',
      shortDescription: 'Our landmark annual conclave exploring international market entry and cross-border trade.',
      fullDescription: 'Over 200 enterprises participated in this cross-border trade summit, sharing strategies for global supply chains, international trade financing, and JV formations across Southeast Asia and the Middle East.',
      eligibility: 'GBN members and vetted global delegates.',
      allowVisitorRequests: false,
      fee: 'Past Session',
      capacity: 250,
      speakerHost: 'GBN Steering Committee',
      supportContact: 'gbncircle@gmail.com',
      status: 'PUBLISHED',
    },
  });

  // Seed sample visitor requests on Event 1 for state testing
  await prisma.visitorRequest.createMany({
    data: [
      {
        eventId: event1.id,
        fullName: 'Rohan Sharma',
        email: 'approved.visitor@example.com',
        phone: '+91 98111 22334',
        country: 'India',
        city: 'Mumbai',
        companyName: 'Apex Innovations Pvt Ltd',
        designation: 'Managing Director',
        industry: 'Information Technology',
        website: 'https://apex.example.com',
        whyAttend: 'Looking to connect with prospective B2B distribution partners.',
        collaborationGoals: 'Seeking alliances in healthcare tech and logistics.',
        status: 'APPROVED',
      },
      {
        eventId: event1.id,
        fullName: 'Priya Iyer',
        email: 'pending.visitor@example.com',
        phone: '+91 98222 33445',
        country: 'India',
        city: 'Pune',
        companyName: 'Iyer Legal Partners',
        designation: 'Managing Partner',
        industry: 'Legal Services',
        whyAttend: 'Interested in understanding the GBN Circle network structure.',
        collaborationGoals: 'Corporate compliance networking and M&A legal advisory.',
        status: 'PENDING',
      },
      {
        eventId: event1.id,
        fullName: 'Vikram Joshi',
        email: 'rejected.visitor@example.com',
        phone: '+91 98333 44556',
        country: 'India',
        city: 'Delhi',
        companyName: 'Crypto Swift Trading',
        designation: 'Freelance Trader',
        industry: 'Crypto / Speculation',
        whyAttend: 'Looking for leads.',
        collaborationGoals: 'Sell crypto signals.',
        status: 'REJECTED',
      },
    ],
  });

  console.log(`Database seeded successfully! Created 4 events and 3 visitor test requests.`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });