import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | GBN Circle — Global Business Network',
  description:
    'A premium global business community built around meaningful relationships, collaboration, and long-term growth.',
};

export default function AboutPage() {
  const missionPoints = [
    'Build meaningful business relationships',
    'Exchange ideas and expertise',
    'Discover opportunities for collaboration',
    'Share introductions and referrals',
    'Learn from one another',
    'Grow together',
  ];

  const values = [
    {
      title: 'Meaningful Relationships',
      description:
        'We believe strong business relationships are built through trust, consistency and genuine interaction.',
    },
    {
      title: 'Collaboration',
      description:
        'We believe different people, ideas and experiences can come together to create greater possibilities.',
    },
    {
      title: 'Knowledge Exchange',
      description:
        'We believe every entrepreneur and professional has knowledge and experience that can create value for others.',
    },
    {
      title: 'Long-Term Growth',
      description:
        'We believe meaningful networking is not about one meeting. It is about relationships that continue to create value over time.',
    },
  ];

  const pillars = [
    {
      title: 'Connect',
      text: 'Meet people who value meaningful business relationships.',
    },
    {
      title: 'Collaborate',
      text: 'Exchange ideas, expertise and opportunities.',
    },
    {
      title: 'Grow',
      text: 'Build relationships that support long-term personal and business growth.',
    },
    {
      title: 'Global',
      text: 'Build connections beyond geographical boundaries.',
    },
  ];

  const leaders = [
    {
      name: 'Amit Batra',
      role: 'Founder',
      description:
        'Driven by the vision of creating a trusted global business networking ecosystem where meaningful relationships create meaningful growth.',
    },
    {
      name: 'Asha Bhasin',
      role: 'Co-Founder',
      description:
        'Part of the leadership team helping build the foundation, community and long-term growth of GBN Circle.',
    },
    {
      name: 'Ditya Batra',
      role: 'Chief Inspiration Officer',
      description:
        'The inspiration behind GBN Circle and the vision of creating a community where people around the world can connect, collaborate and grow together.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#070b19] text-white selection:bg-[#c5a059] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-36 pb-24 border-b border-[#1e293b]/60">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(197,160,89,0.12),transparent_70%)] animate-pulse duration-[8000ms]" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#e6ca85] text-xs font-semibold tracking-widest uppercase mb-6 transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/20">
            About GBN Circle
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-8 leading-tight">
            A Global Business Community Built Around{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11]">
              Meaningful Relationships.
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-6">
            GBN Circle is a premium global business network for entrepreneurs, business owners, founders, professionals, and business leaders who believe in the power of meaningful relationships, collaboration, and long-term growth.
          </p>
          <p className="text-[#c5a059] font-medium tracking-widest text-sm uppercase">
            Connect &bull; Collaborate &bull; Grow
          </p>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-24 border-b border-[#1e293b]/60 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-4 text-[#c5a059] text-xs font-semibold tracking-widest uppercase">
            Our Story
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-8">
            Why GBN Circle Exists
          </h2>
          <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-light">
            <p className="text-xl font-normal text-white">
              Business is built by people.
            </p>
            <div className="border-l-2 border-[#c5a059] pl-6 py-3 space-y-3 bg-[#0d1527]/50 rounded-r-lg transition-colors hover:bg-[#0d1527]/80">
              <p className="italic text-slate-200">The right conversation can create an idea.</p>
              <p className="italic text-slate-200">The right relationship can create trust.</p>
              <p className="italic text-slate-200">The right connection can create an opportunity.</p>
            </div>
            <p>
              GBN Circle was created to bring the right people together in a structured, professional, and human environment where meaningful business relationships can develop over time.
            </p>
            <div className="pt-2 text-slate-200 font-normal">
              <p>Our goal is not simply to create more connections.</p>
              <p className="text-[#e6ca85] font-medium mt-1">
                Our goal is to create meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-4">
            Our Purpose
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            Bringing People Together. Creating Possibilities.
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto">
            GBN Circle exists to create a trusted global environment where entrepreneurs, professionals, and business leaders can connect, exchange knowledge, explore collaboration, and build relationships that support long-term growth.
          </p>
        </div>
      </section>

      {/* 4. OUR MISSION */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3">
              Our Mission
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
              To create meaningful business connections through collaboration, knowledge exchange and long-term relationships.
            </h2>
            <p className="text-slate-400 text-sm font-light">
              We aim to foster a trusted business community where members thrive together:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#0e172a]/60 border border-[#1e293b] hover:border-[#c5a059]/50 hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4 shadow-lg shadow-black/20"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center font-serif text-sm">
                  {index + 1}
                </span>
                <span className="text-slate-200 text-sm leading-snug pt-1">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR VISION */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-4">
            Our Vision
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            To build a trusted global business community where people can connect, collaborate and grow beyond geographical boundaries.
          </h2>
          <p className="text-[#c5a059] text-sm tracking-widest uppercase font-medium mb-8">
            Cities &bull; Industries &bull; Markets &bull; Countries
          </p>
          <div className="p-8 rounded-2xl border border-[#c5a059]/30 bg-[#070b19]/80 backdrop-blur-sm max-w-xl mx-auto shadow-xl shadow-black/30 hover:border-[#c5a059]/60 transition-all duration-300">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">The Vision is Simple</p>
            <p className="text-lg md:text-xl font-serif text-white leading-relaxed">
              Connect people.<br />
              Collaborate with purpose.<br />
              <span className="text-[#e6ca85] font-medium">Grow together.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHAT WE BELIEVE / CORE VALUES */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3">
              What We Believe
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-b from-[#0d1629] to-[#090e1a] border border-[#1e293b] hover:border-[#c5a059]/50 hover:-translate-y-1.5 transition-all duration-300 group shadow-lg shadow-black/20"
              >
                <div className="w-10 h-0.5 bg-[#c5a059] mb-6 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#e6ca85] transition-colors">
                  {val.title}
                </h3>
                <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY GBN CIRCLE */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3">
              Why GBN Circle
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
              More Than Networking. A Community With Purpose.
            </h2>
            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
              GBN Circle is not simply about attending networking events. It is about creating an environment where people can meet, understand, connect and build relationships that can lead to collaboration and opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#070b19] border border-[#1e293b] hover:border-[#c5a059]/50 hover:-translate-y-1.5 transition-all duration-300 text-center shadow-md shadow-black/20"
              >
                <h3 className="text-lg font-serif text-[#e6ca85] uppercase tracking-wider mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR GLOBAL PERSPECTIVE */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3">
            Our Global Perspective
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            A Network Without Borders
          </h2>
          <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Today&apos;s businesses are increasingly connected across markets and geographies. GBN Circle is built with a global outlook—creating an environment where business leaders can develop relationships beyond their immediate location and industry.
          </p>
          <div className="inline-block py-3 px-6 rounded-lg bg-[#0e172a] border border-[#c5a059]/30 hover:border-[#c5a059]/60 hover:scale-105 transition-all duration-300">
            <p className="text-sm md:text-base font-serif text-[#e6ca85] tracking-wide">
              Think Beyond Your Network. Connect Beyond Borders.
            </p>
          </div>
        </div>
      </section>

      {/* 9. LEADERSHIP HIGHLIGHT */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3">
              Our Leadership
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">
              The People Behind GBN Circle
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Guided by purpose, sustained by meaningful relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#070b19] border border-[#1e293b] hover:border-[#c5a059]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/20"
              >
                <div>
                  <h3 className="text-lg font-serif text-white mb-1">
                    {leader.name}
                  </h3>
                  <div className="text-xs uppercase tracking-wider text-[#c5a059] mb-4">
                    {leader.role}
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/leadership"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#c5a059] text-[#e6ca85] hover:bg-[#c5a059]/10 hover:scale-105 active:scale-95 text-sm font-medium transition-all duration-200"
            >
              Meet Our Leadership
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FINAL ABOUT STATEMENT & CTA */}
      <section className="py-24 text-center relative">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            Built Around People. Driven by Possibility.
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-6">
            GBN Circle brings together people who believe that meaningful relationships can open new doors, create new conversations, and build new possibilities.
          </p>
          <p className="text-[#c5a059] font-medium tracking-widest text-xs uppercase mb-10">
            Connect &bull; Collaborate &bull; Grow
          </p>
          <div>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-[#c5a059] text-black font-semibold text-sm hover:bg-[#d4af37] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#c5a059]/10"
            >
              Join GBN Circle
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}