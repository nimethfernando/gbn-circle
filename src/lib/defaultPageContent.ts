// src/lib/defaultPageContent.ts
// Structured default content schemas and approved PRD copy for all editable pages

export interface HomePageContent {
  hero: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
    showBrochureBtn?: boolean;
    brochureBtnText?: string;
    brochureUrl?: string;
  };
  whatIsGbn: {
    badge: string;
    heading: string;
    description: string;
    btnText: string;
    btnLink: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  whoIsGbnFor: {
    badge: string;
    heading: string;
    intro: string;
    circleEligibility: string;
    eliteEligibility: string;
    btnText: string;
    btnLink: string;
    roles: Array<{ title: string; desc: string }>;
  };
  insideGbn: {
    heading: string;
    headingGold: string;
    description: string;
    experiences: Array<{ title: string; desc: string }>;
  };
  threePrinciples: {
    heading: string;
    quote: string;
    principles: Array<{ title: string; desc: string }>;
  };
  gbnExperience: {
    heading: string;
    subtitle: string;
    circleTitle: string;
    circleBadge: string;
    circleDesc: string;
    circleFeatures: string[];
    circleBtnText: string;
    circleBtnLink: string;
    eliteTitle: string;
    eliteBadge: string;
    eliteDesc: string;
    eliteFeatures: string[];
    eliteBtnText: string;
    eliteBtnLink: string;
  };
  globalNetwork: {
    badge: string;
    heading: string;
    description: string;
    georgiaOffice: string;
    indiaOffice: string;
  };
  leadershipSection: {
    badge: string;
    heading: string;
    description: string;
    btnText: string;
    btnLink: string;
  };
  leaders?: Array<{
    name: string;
    role: string;
    statement: string;
    image: string;
    focus?: string[];
    linkedinUrl?: string | null;
  }>;
  inspiration: {
    heading: string;
    quote: string;
    btnText: string;
    btnLink: string;
  };
  memberCommunity: {
    badge: string;
    heading: string;
    desc1: string;
    desc2: string;
    btnText: string;
    btnLink: string;
    categories: string[];
  };
  finalCta: {
    badge: string;
    heading: string;
    subtitle: string;
    circleBtnText: string;
    circleBtnLink: string;
    eliteBtnText: string;
    eliteBtnLink: string;
    footnote: string;
  };
  visibility?: {
    // Members & Community
    showMemberSection?: boolean;
    showMemberNav?: boolean;

    // Social Media Links & Visibility
    showInstagram?: boolean;
    instagramUrl?: string;
    showLinkedIn?: boolean;
    linkedInUrl?: string;

    // Homepage Section Visibility
    showEventsSection?: boolean;
    showLeadershipSection?: boolean;
    showInspirationSection?: boolean;
    showJourneySection?: boolean;
    showGlobalNetworkSection?: boolean;
    showExperienceSection?: boolean;

    // Navigation Menu Visibility
    showEventsNav?: boolean;
    showBlogsNav?: boolean;
    showCommunityNav?: boolean;
    showLeadershipNav?: boolean;

    // Brochure Download Button & Link
    showBrochureBtn?: boolean;
    brochureBtnText?: string;
    brochureUrl?: string;
  };
}

export interface AboutPageContent {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  story: {
    badge: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  vision: {
    badge: string;
    heading: string;
    quote: string;
  };
  values: Array<{ title: string; description: string }>;
  pillars: Array<{ title: string; text: string }>;
  finalCta: {
    heading: string;
    description: string;
    btnText: string;
    btnLink: string;
  };
}

export interface CommunityPageContent {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  comparisonMatrix: {
    circleCohort: string;
    eliteCouncil: string;
    items: Array<{
      feature: string;
      circle: string;
      elite: string;
      highlight: boolean;
    }>;
  };
  cta: {
    circleBtnText: string;
    circleBtnLink: string;
    eliteBtnText: string;
    eliteBtnLink: string;
  };
}

export interface LeadershipPageContent {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    intro: string;
  };
  intro?: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
  };
  leaders: Array<{
    name: string;
    role: string;
    statement: string;
    image: string;
    focus?: string[];
    linkedinUrl?: string | null;
  }>;
  principles?: Array<{
    title: string;
    description: string;
  }>;
  journey: Array<{
    stage: string;
    description: string;
  }>;
  finalCta: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
  showLinkedIn?: boolean;
}

export interface ContactPageContent {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  channels: {
    email: string;
    phone: string;
    website: string;
    georgiaOffice: string;
    indiaOffice: string;
    instagramUrl: string;
    linkedInUrl: string;
    showInstagram?: boolean;
    showLinkedIn?: boolean;
  };
  form: {
    submitBtnText: string;
    defaultSubject: string;
  };
}

export type PageContentMap = {
  home: HomePageContent;
  about: AboutPageContent;
  community: CommunityPageContent;
  leadership: LeadershipPageContent;
  contact: ContactPageContent;
};

export const DEFAULT_PAGE_CONTENTS: PageContentMap = {
  home: {
    hero: {
      badge: "Connect • Collaborate • Grow",
      headingLine1: "Connect With Business Leaders.",
      headingLine2: "Grow Together.",
      subtitle:
        "GBN Circle is a global business network for entrepreneurs, professionals and business leaders seeking meaningful connections, collaboration and new opportunities.",
      primaryBtnText: "Join GBN Circle",
      primaryBtnLink: "/community",
      secondaryBtnText: "Explore the Community",
      secondaryBtnLink: "/community",
      showBrochureBtn: false,
      brochureBtnText: "Download Brochure",
      brochureUrl: "/brochure.pdf",
    },
    whatIsGbn: {
      badge: "What is GBN Circle?",
      heading: "A Business Network Built Around Meaningful Relationships.",
      description:
        "Networking should be more than exchanging business cards. GBN Circle brings entrepreneurs, professionals and business leaders together through structured networking experiences designed to create meaningful relationships, exchange opportunities and encourage collaboration.",
      btnText: "Discover GBN Circle",
      btnLink: "/about",
      pillars: [
        {
          title: "Meet People",
          desc: "Connect with entrepreneurs, professionals and leaders across industries.",
        },
        {
          title: "Build Relationships",
          desc: "Develop long-term professional relationships based on trust and mutual value.",
        },
        {
          title: "Exchange Opportunities",
          desc: "Discover referrals, partnerships and collaborative possibilities.",
        },
        {
          title: "Collaborate & Grow",
          desc: "Grow your business through meaningful community engagement.",
        },
      ],
    },
    whoIsGbnFor: {
      badge: "Who Is GBN Circle For?",
      heading: "Built for People Who Believe in the Power of Connection.",
      intro:
        "GBN Circle is designed for entrepreneurs, professionals and business leaders who want to build stronger networks and explore meaningful business opportunities.",
      circleEligibility: "GBN Circle: Businesses with ₹20 Lakh+ annual turnover",
      eliteEligibility: "GBN Elite: Businesses with ₹5 Crore+ annual turnover",
      btnText: "Explore Membership",
      btnLink: "/community",
      roles: [
        {
          title: "Entrepreneurs",
          desc: "Founders looking to expand reach and collaborate with peers.",
        },
        {
          title: "Business Owners",
          desc: "Established owners looking for partnerships and new markets.",
        },
        {
          title: "Professionals",
          desc: "Experts seeking visibility and high-value connections.",
        },
        {
          title: "Industry Experts",
          desc: "Specialists looking to share knowledge and expand influence.",
        },
        {
          title: "Business Leaders",
          desc: "Executives looking for high-level conversations and strategic networks.",
        },
      ],
    },
    insideGbn: {
      heading: "It's More Than a Meeting.",
      headingGold: "It's a Business Experience.",
      description:
        "GBN Circle creates regular opportunities for members to meet, introduce themselves, present their businesses, exchange ideas and discover opportunities for collaboration.",
      experiences: [
        {
          title: "ONLINE CONNECT",
          desc: "Connect virtually with fellow members across regions.",
        },
        {
          title: "PHYSICAL MEET",
          desc: "Meet and interact with the executive community in person.",
        },
        {
          title: "BUSINESS PRESENTATIONS",
          desc: "Present your business, expertise and offerings to peers.",
        },
        {
          title: "NETWORKING",
          desc: "Discover people, ideas and fresh business possibilities.",
        },
        {
          title: "COLLABORATION",
          desc: "Explore referrals, joint ventures and commercial partnerships.",
        },
        {
          title: "KNOWLEDGE EXCHANGE",
          desc: "Learn from the experience and expertise of the executive community.",
        },
      ],
    },
    threePrinciples: {
      heading: "Three Principles. One Business Community.",
      quote: "Your network can become your next opportunity.",
      principles: [
        {
          title: "CONNECT",
          desc: "Build meaningful relationships with entrepreneurs, professionals and business leaders.",
        },
        {
          title: "COLLABORATE",
          desc: "Exchange ideas, expertise, referrals and opportunities.",
        },
        {
          title: "GROW",
          desc: "Expand your network, knowledge, visibility and business possibilities.",
        },
      ],
    },
    gbnExperience: {
      heading: "Choose Your GBN Experience",
      subtitle:
        "Understanding the difference between our core entrepreneurial network (₹20L+ annual turnover) and exclusive executive council (₹5Cr+ annual turnover).",
      circleTitle: "GBN Circle",
      circleBadge: "For businesses with ₹20 Lakh+ annual turnover",
      circleDesc:
        "A structured business networking experience for entrepreneurs, professionals and business leaders.",
      circleFeatures: [
        "Online networking",
        "Physical networking",
        "Member presentations",
        "Business introductions",
        "Networking & opportunity exchange",
        "Knowledge sharing",
        "Collaboration opportunities",
        "Global business connections",
      ],
      circleBtnText: "Explore GBN Circle",
      circleBtnLink: "/community",
      eliteTitle: "GBN Elite",
      eliteBadge: "For businesses with ₹5 Crore+ annual turnover",
      eliteDesc:
        "A premium networking experience for established business leaders seeking focused conversations, strategic relationships and high-value connections.",
      eliteFeatures: [
        "Premium morning networking",
        "High-value introductions",
        "Strategic conversations",
        "Focused collaboration",
        "Leadership-level networking",
        "Breakfast included in the experience",
      ],
      eliteBtnText: "Explore GBN Elite",
      eliteBtnLink: "/community",
    },
    globalNetwork: {
      badge: "Global Network",
      heading: "Business Has No Borders. Neither Should Your Network.",
      description:
        "GBN Circle is expanding across key business hubs globally, creating seamless avenues for cross-border trade, investments, and partnerships.",
      georgiaOffice: "17 Ioane Shavteli St, Tbilisi, Georgia",
      indiaOffice:
        "3rd floor, 243, Seva Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004",
    },
    leadershipSection: {
      badge: "Leadership",
      heading: "Meet the Leadership Behind GBN Circle",
      description:
        "GBN Circle is built on a simple belief: meaningful connections can create meaningful possibilities.",
      btnText: "Meet Our Leadership",
      btnLink: "/leadership",
    },
    leaders: [
      {
        name: "Amit Batra",
        role: "Founder",
        statement:
          "Driven by the vision of creating a trusted global business networking ecosystem where meaningful relationships create meaningful growth.",
        image: "/event-leadership-C1eE1_9Q.jpg",
        focus: [
          "Vision & Strategy",
          "Global Business Network",
          "Community Development",
          "Long-Term Growth",
        ],
        linkedinUrl: "#",
      },
      {
        name: "Asha Bhasin",
        role: "Co-Founder",
        statement:
          "Part of the leadership team helping build the foundation, community and long-term growth of GBN Circle.",
        image: "/event-leadership-C1eE1_9Q (1).jpg",
        focus: [
          "Community Foundation",
          "Member Experience",
          "Community Development",
          "Long-Term Growth",
        ],
        linkedinUrl: "#",
      },
      {
        name: "Ditya Batra",
        role: "Chief Inspiration Officer",
        statement:
          "The inspiration behind GBN Circle and the vision of creating a community where people around the world can connect, collaborate and grow together.",
        image: "/vision-wide-Dafp-BMf.jpg",
        focus: [
          "Inspiration",
          "Human Connection",
          "Community Vision",
          "Connect • Collaborate • Grow",
        ],
        linkedinUrl: null,
      },
    ],
    inspiration: {
      heading: "Inspired by Connection. Built for the Future.",
      quote:
        "GBN Circle was inspired by Ditya Batra and the belief that bringing people together can create opportunities, relationships and possibilities that extend far beyond a single meeting.",
      btnText: "Discover Our Story",
      btnLink: "/about",
    },
    memberCommunity: {
      badge: "Member Base",
      heading: "Meet People. Discover Possibilities.",
      desc1:
        "Every member brings something different—experience, expertise, ideas, opportunities and relationships.",
      desc2:
        "GBN Circle brings these strengths together to create an environment where people can connect, collaborate and grow.",
      btnText: "Explore Members",
      btnLink: "/members",
      categories: [
        "Entrepreneurs",
        "Business Owners",
        "Professionals",
        "Industry Experts",
        "Consultants",
        "Founders",
        "Business Leaders",
      ],
    },
    finalCta: {
      badge: "Membership Tiers & Evaluation Matrix",
      heading: "Ready to Expand Your Business Network?",
      subtitle:
        "Join GBN Circle today and become part of a global community built on meaningful relationships, trust, and shared growth.",
      circleBtnText: "Join GBN Circle",
      circleBtnLink: "/community",
      eliteBtnText: "Apply for GBN Elite",
      eliteBtnLink: "/contact",
      footnote:
        "* Full membership plans, regional chapter dues, and onboarding schedules are provided upon executive application review.",
    },
    visibility: {
      showMemberSection: false,
      showMemberNav: false,

      showInstagram: true,
      instagramUrl: "https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr",
      showLinkedIn: false,
      linkedInUrl: "https://www.linkedin.com/company/gbn-circle/",

      showEventsSection: true,
      showLeadershipSection: true,
      showInspirationSection: true,
      showJourneySection: true,
      showGlobalNetworkSection: true,
      showExperienceSection: true,

      showEventsNav: true,
      showBlogsNav: true,
      showCommunityNav: true,
      showLeadershipNav: true,

      showBrochureBtn: false,
      brochureBtnText: "Download Brochure",
      brochureUrl: "/brochure.pdf",
    },
  },

  about: {
    hero: {
      badge: "About GBN Circle",
      heading: "A Global Business Community Built Around Meaningful Relationships.",
      subtitle:
        "GBN Circle is a premium global business network for entrepreneurs, business owners, founders, professionals, and business leaders who believe in the power of meaningful relationships, collaboration, and long-term growth.",
    },
    story: {
      badge: "Our Story",
      heading: "From a Shared Vision to a Global Network",
      paragraph1:
        "GBN Circle was born from a fundamental observation: while digital communication has made it easier than ever to connect, building genuine, high-trust business relationships has become harder.",
      paragraph2:
        "Founded by entrepreneurs for entrepreneurs, GBN Circle was established to bridge this gap. We created a structured, relationship-first environment where members meet regularly—both online and in person—to share knowledge, explore collaborations, and unlock new opportunities across borders.",
      paragraph3:
        "Today, GBN Circle brings together ambitious leaders across India, Georgia, and the wider international business community, united by a belief that sustainable business growth comes from trust, mutual respect, and long-term collaboration.",
    },
    vision: {
      badge: "Vision & Purpose",
      heading: "Building the World's Most Trusted Business Network",
      quote: "Connect people. Collaborate with purpose. Grow together.",
    },
    values: [
      {
        title: "Meaningful Relationships",
        description:
          "We believe strong business relationships are built through trust, consistency and genuine interaction.",
      },
      {
        title: "Collaboration",
        description:
          "We believe different people, ideas and experiences can come together to create greater possibilities.",
      },
      {
        title: "Knowledge Exchange",
        description:
          "We believe every entrepreneur and professional has knowledge and experience that can create value for others.",
      },
      {
        title: "Long-Term Growth",
        description:
          "We believe meaningful networking is not about one meeting. It is about relationships that continue to create value over time.",
      },
    ],
    pillars: [
      {
        title: "Connect",
        text: "Meet people who value meaningful business relationships.",
      },
      {
        title: "Collaborate",
        text: "Exchange ideas, expertise and opportunities.",
      },
      {
        title: "Grow",
        text: "Build relationships that support long-term personal and business growth.",
      },
      {
        title: "Global",
        text: "Build connections beyond geographical boundaries.",
      },
    ],
    finalCta: {
      heading: "Built Around People. Driven by Possibility.",
      description:
        "GBN Circle brings together people who believe that meaningful relationships can open new doors, create new conversations, and build new possibilities.",
      btnText: "Join GBN Circle",
      btnLink: "/community",
    },
  },

  community: {
    hero: {
      badge: "Membership Tiers",
      heading: "Architected for Scaled Founders",
      subtitle:
        "GBN Circle maintains strict revenue-verified entry barriers to ensure high-velocity cross-referrals and high-trust peer collaborations.",
    },
    comparisonMatrix: {
      circleCohort: "₹20L+ Cohort",
      eliteCouncil: "₹5Cr+ Council",
      items: [
        {
          feature: "Revenue Eligibility Threshold",
          circle: "₹20 Lakhs+ Annual Turnover",
          elite: "₹5 Crores+ Annual Turnover",
          highlight: true,
        },
        {
          feature: "Target Profile",
          circle: "Emerging founders, agency owners, and service partners",
          elite: "Industrialists, large enterprise CXOs, and seasoned founders",
          highlight: false,
        },
        {
          feature: "Meeting Frequency",
          circle: "Weekly Virtual Connects & Monthly Chapter Meets",
          elite: "Bi-weekly Closed Masterminds & Quarterly Retreats",
          highlight: false,
        },
        {
          feature: "Room Format",
          circle: "Structured cross-industry peer networking",
          elite: "Strategic roundtables, investment syndication & advisory",
          highlight: false,
        },
        {
          feature: "Category Exclusivity",
          circle: "Limited representation per business vertical",
          elite: "Strict single-seat exclusivity per industry",
          highlight: true,
        },
        {
          feature: "Global Business Delegations",
          circle: "Standard international directory access",
          elite: "Priority access to overseas trade summits & bilateral delegations",
          highlight: false,
        },
        {
          feature: "Credential Verification",
          circle: "Financial statement & business verification review",
          elite: "Board-level screening & peer council endorsement",
          highlight: false,
        },
      ],
    },
    cta: {
      circleBtnText: "Apply for GBN Circle",
      circleBtnLink: "/community",
      eliteBtnText: "Apply for GBN Elite",
      eliteBtnLink: "/contact",
    },
  },

  leadership: {
    hero: {
      badge: "Leadership",
      heading: "The People Behind GBN Circle",
      subtitle:
        "GBN Circle is built with a simple belief — meaningful relationships create meaningful growth.",
      intro:
        "Behind the community is a leadership team committed to building a trusted global business network where entrepreneurs, professionals and business leaders can connect, collaborate and grow together.",
    },
    intro: {
      badge: "Leadership With Purpose",
      heading: "Shaping a Business Community for Genuine Growth",
      p1: "GBN Circle is more than a networking platform. It is a community shaped by people who believe in the power of relationships, collaboration and shared growth.",
      p2: "Our leadership brings together vision, community building and inspiration to create a business network designed for meaningful, long-term connections.",
    },
    leaders: [
      {
        name: "Amit Batra",
        role: "Founder",
        statement:
          "Driven by the vision of creating a trusted global business networking ecosystem where meaningful relationships create meaningful growth.",
        image: "/event-leadership-C1eE1_9Q.jpg",
        focus: [
          "Vision & Strategy",
          "Global Business Network",
          "Community Development",
          "Long-Term Growth",
        ],
        linkedinUrl: "#",
      },
      {
        name: "Asha Bhasin",
        role: "Co-Founder",
        statement:
          "Part of the leadership team helping build the foundation, community and long-term growth of GBN Circle.",
        image: "/event-leadership-C1eE1_9Q (1).jpg",
        focus: [
          "Community Foundation",
          "Member Experience",
          "Community Development",
          "Long-Term Growth",
        ],
        linkedinUrl: "#",
      },
      {
        name: "Ditya Batra",
        role: "Chief Inspiration Officer",
        statement:
          "The inspiration behind GBN Circle and the vision of creating a community where people around the world can connect, collaborate and grow together.",
        image: "/vision-wide-Dafp-BMf.jpg",
        focus: [
          "Inspiration",
          "Human Connection",
          "Community Vision",
          "Connect • Collaborate • Grow",
        ],
        linkedinUrl: null,
      },
    ],
    principles: [
      {
        title: "Meaningful Relationships",
        description:
          "Build relationships based on trust, consistency and genuine interaction.",
      },
      {
        title: "Collaboration",
        description:
          "Bring together different people, ideas and experiences to create possibilities.",
      },
      {
        title: "Global Perspective",
        description:
          "Think beyond geographical boundaries and build connections across markets and communities.",
      },
      {
        title: "Long-Term Growth",
        description:
          "Create relationships and opportunities that continue beyond a single meeting.",
      },
    ],
    journey: [
      {
        stage: "VISION",
        description:
          "A vision to bring people together through meaningful business relationships.",
      },
      {
        stage: "COMMUNITY",
        description:
          "Building a structured and trusted environment for entrepreneurs, professionals and business leaders.",
      },
      {
        stage: "GLOBAL NETWORK",
        description:
          "Creating opportunities for people to connect, collaborate and grow beyond geographical boundaries.",
      },
    ],
    finalCta: {
      badge: "Get Involved",
      heading: "Be Part of the GBN Circle",
      subtitle:
        "Connect with a community built around meaningful business relationships, collaboration and long-term growth.",
      primaryBtnText: "Join GBN Circle",
      primaryBtnLink: "/community",
      secondaryBtnText: "Explore the Community",
      secondaryBtnLink: "/community",
    },
    showLinkedIn: false,
  },

  contact: {
    hero: {
      badge: "Contact Us",
      heading: "Let's Connect & Grow Together",
      subtitle:
        "GBN Circle se judne, membership ke baare mein jaanne, partnership ya kisi business enquiry ke liye humse contact karein.",
    },
    channels: {
      email: "gbncircle@gmail.com",
      phone: "+91 9783577773",
      website: "www.gbncircle.com",
      georgiaOffice: "17 Ioane Shavteli St, Tbilisi, Georgia",
      indiaOffice:
        "3rd floor, 243, Seva Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004",
      instagramUrl: "https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr",
      linkedInUrl: "https://www.linkedin.com/company/gbn-circle/",
      showLinkedIn: false,
    },
    form: {
      submitBtnText: "Contact GBN Circle",
      defaultSubject: "Executive Membership Inquiry",
    },
  },
};

export const PAGE_DEFINITIONS = [
  { slug: "home", title: "Home Page", path: "/" },
  { slug: "about", title: "About Us Page", path: "/about" },
  { slug: "community", title: "Community & Membership Page", path: "/community" },
  { slug: "leadership", title: "Leadership Page", path: "/leadership" },
  { slug: "contact", title: "Contact Page", path: "/contact" },
];
