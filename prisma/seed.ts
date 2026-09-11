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
  await prisma.blog.deleteMany();
  await prisma.member.deleteMany();

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

  // Seed initial PRD Page 45 blogs
  console.log('Seeding initial executive blog articles...');
  await prisma.blog.createMany({
    data: [
      {
        slug: 'anatomy-of-high-trust-business-networks',
        title: 'The Anatomy of High-Trust Business Networks: Why Quality Always Trumps Quantity',
        excerpt:
          'In a hyper-connected world inundated with digital spam and transactional requests, high-tier founders are returning to curated, vetted private circles where confidentiality and trust form the bedrock of dealmaking.',
        category: 'Networking & Trust',
        readTime: '6 min read',
        authorName: 'GBN Executive Board',
        authorRole: 'Global Business Network Leadership',
        image: '/vision-wide-Dafp-BMf.jpg',
        featured: true,
        published: true,
        takeaways: JSON.stringify([
          'Transactional networking yields shallow contacts; curated peer circles unlock transformational joint ventures.',
          'Trust is cultivated through rigorous peer screening and non-solicitation community norms.',
          'High-table relationships compound in value over decades, acting as an executive balance sheet.',
        ]),
        content: `In modern commerce, the volume of your contact book has ceased to be an advantage. What matters today is relationship density — the proportion of contacts in your circle with whom you share mutual trust, intellectual alignment, and strategic synergy.

When founders assemble in unfiltered networking groups, conversations inevitably descend into pitch-fests. Real dealmaking, capital allocation, and market expansion never happen in such environments. They happen in closed rooms where everyone has skin in the game, a verified track record, and a shared ethos of peer elevation.

High-trust networks operate on three non-negotiable axioms:
1. Strict Revenue & Character Verification: Ensuring every peer has conquered similar operational complexities.
2. The Giver-First Principle: Relationships begin with intellectual generosity and ecosystem support rather than immediate commercial asks.
3. Radical Discretion: Private boardroom discussions remain strictly confidential, allowing vulnerability and authentic strategic debate.

As your enterprise scales, audit your network ruthlessly. Prune transactional noise and invest deeply in high-trust peer circles.`,
      },
      {
        slug: 'cross-border-market-entry-playbook',
        title: 'Cross-Border Market Entry for Mid-Market Enterprises: Playbooks & Pitfalls',
        excerpt:
          'Expanding into international territories requires more than capital; it requires trusted local counterparts who navigate regulatory friction, cultural nuances, and distribution channels.',
        category: 'Global Expansion',
        readTime: '8 min read',
        authorName: 'Sanjay Nair',
        authorRole: 'Regional Director, South India Chapter',
        image: '/event-global-CKOLaEg2 (1).jpg',
        featured: false,
        published: true,
        takeaways: [
          'Direct export without local ground-level alliances carries a 70% higher operational failure rate.',
          'Bilateral peer networks eliminate months of cold outreach when entering the GCC and Southeast Asian corridors.',
          'Structuring joint ventures with vetted regional partners protects IP and accelerates regulatory licensing.',
        ].join('\n'),
        content: `Expanding into international territories is one of the most perilous leaps a mid-market enterprise can take. Traditional playbooks advocate heavy consulting expenditure, broad trade fairs, and speculative marketing campaigns. Yet data indicates that over 65% of international expansions fail to achieve profitability within three years.

The differentiator between successful globalizers and failed attempts is local peer sponsorship. When you enter a new jurisdiction with an introduction from an established peer in that market, bureaucratic hurdles diminish, banking relationships materialize swiftly, and initial customer discovery accelerates by months.

GBN Circle was founded specifically to bridge this void — creating reliable corridors between India, the GCC, Southeast Asia, and European commercial hubs through verified executive introductions.`,
      },
      {
        slug: 'from-transactional-to-transformational',
        title: 'From Transactional Referrals to Long-Term Strategic Joint Ventures',
        excerpt:
          'How seasoned founders transcend direct lead-generation to engineer equity partnerships, shared IP, and consortium bids that reshape industry verticals.',
        category: 'Leadership',
        readTime: '5 min read',
        authorName: 'Amit Batra',
        authorRole: 'Founder & President, GBN Circle',
        image: '/event-leadership-C1eE1_9Q (1).jpg',
        featured: false,
        published: true,
        takeaways: [
          'Lead exchange produces linear revenue; strategic joint ventures produce exponential valuation growth.',
          'Complementary skill matrices among peers unlock consortium bidding on multi-million dollar contracts.',
          'True collaboration requires understanding a partner’s strategic vision, not just their price sheet.',
        ].join('\n'),
        content: `Most business networks measure their success in referrals exchanged. While immediate business flow is valuable, it represents the lowest common denominator of business networking.

The true inflection point in an entrepreneur's journey occurs when networking shifts from transactional to transformational. Transformational networking is when two non-competing firms combine their competencies to bid for contracts that neither could fulfill alone, or when two founders co-found a technology spin-off capitalizing on their collective client bases.

At GBN Circle, our structured interaction frameworks are purposefully calibrated to surface hidden strategic synergies. We urge leaders to look beyond the immediate sale and ask: 'What multi-crore problem can we solve by combining forces?'`,
      },
      {
        slug: 'architecture-of-peer-masterminds',
        title: 'The Architecture of Peer Masterminds: How 8-Figure Founders Solve High-Stakes Dilemmas',
        excerpt:
          'Inside the closed-door dynamics of executive masterminds where founders debate capital allocation, leadership burnout, and crisis management without fear of exposure.',
        category: 'Leadership',
        readTime: '7 min read',
        authorName: 'Dr. Rajesh Kothari',
        authorRole: 'Senior Director, GBN Elite Board',
        image: '/event-leadership-C1eE1_9Q.jpg',
        featured: false,
        published: true,
        takeaways: [
          'Chief executives have fewer confidants as their companies grow; peer masterminds eliminate executive loneliness.',
          'Unbiased peer critiques unearth cognitive blind spots in capital allocation and board governance.',
          'Cross-industry perspectives frequently solve legacy domain bottlenecks with breakthrough paradigms.',
        ].join('\n'),
        content: `It is a truism of leadership that the higher you ascend, the narrower your counsel becomes. Founders cannot openly discuss existential anxieties with their subordinates, and board members often have fiduciary interests that mandate a curated posture.

A peer mastermind provides the psychological and strategic sanctuary required for high-stakes problem-solving. Surrounded by peers who operate at comparable revenue scales but in non-competing sectors, founders can lay bare operational crises, messy co-founder disputes, or market pivots without posturing.

The collective intelligence of a room with 50+ combined years of founder experience routinely resolves in thirty minutes what months of internal management meetings fail to untangle.`,
      },
    ],
  });

  console.log('Seeding verified GBN Circle members (PRD Sec. 5 & 24)...');
  await prisma.member.createMany({
    data: [
      {
        name: 'Rajesh Subramanian',
        email: 'rajesh@apexlogistics.com',
        phone: '+91 98200 11223',
        company: 'Apex Logistics & Freight Corp',
        designation: 'Managing Director',
        industry: 'Logistics & Supply Chain',
        tier: 'GBN Elite',
        city: 'Mumbai',
        turnoverBand: '₹5Cr+',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
      {
        name: 'Kavita Menon',
        email: 'kavita@studioterra.in',
        phone: '+91 98450 33445',
        company: 'Studio Terra Spatial Labs',
        designation: 'Founder & Principal Architect',
        industry: 'Architecture & Design',
        tier: 'GBN Circle',
        city: 'Bengaluru',
        turnoverBand: '₹20L - ₹1Cr',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
      {
        name: 'Arunav Singhal',
        email: 'arunav@novusprecision.com',
        phone: '+91 98110 55667',
        company: 'Novus Precision Engineering',
        designation: 'Chief Executive Officer',
        industry: 'Manufacturing',
        tier: 'GBN Elite',
        city: 'Pune',
        turnoverBand: '₹5Cr+',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
      {
        name: 'Priyanka Sen',
        email: 'priyanka@senassociates.in',
        phone: '+91 98710 77889',
        company: 'Sen & Associates Corporate Law',
        designation: 'Managing Partner',
        industry: 'Legal & Compliance',
        tier: 'GBN Circle',
        city: 'New Delhi',
        turnoverBand: '₹1Cr - ₹5Cr',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
      {
        name: 'Vikramaditya Chawla',
        email: 'vikram@synthetixcloud.io',
        phone: '+91 98490 99001',
        company: 'Synthetix Cloud Systems',
        designation: 'Co-Founder & CTO',
        industry: 'Information Technology',
        tier: 'GBN Circle',
        city: 'Hyderabad',
        turnoverBand: '₹1Cr - ₹5Cr',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
      {
        name: 'Deepak Merchant',
        email: 'deepak@merchantpolymers.com',
        phone: '+91 98250 22334',
        company: 'Merchant Polymers & Packaging',
        designation: 'Chairman & MD',
        industry: 'Manufacturing',
        tier: 'GBN Elite',
        city: 'Ahmedabad',
        turnoverBand: '₹5Cr+',
        status: 'ACTIVE',
        linkedIn: 'https://linkedin.com',
      },
    ],
  });

  console.log(`Database seeded successfully! Created 4 events, 3 visitor test requests, 4 blogs, and 6 active members.`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });