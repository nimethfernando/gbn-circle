import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership | GBN Circle — Global Business Network',
  description:
    'Meet the leadership team behind GBN Circle — driven by purpose, human connection, and meaningful relationships.',
};

export default function LeadershipPage() {
  const leadershipProfiles = [
    {
      name: 'Amit Batra',
      role: 'Founder',
      image: '/event-leadership-C1eE1_9Q.jpg', // Replace with approved authentic portrait
      statement:
        'Amit Batra is the Founder of GBN Circle, driven by the vision of creating a trusted global business networking ecosystem where meaningful relationships create meaningful growth. His vision is to bring entrepreneurs, professionals and business leaders together in an environment where genuine conversations can lead to collaboration, opportunities and long-term relationships.',
      focus: [
        'Vision & Strategy',
        'Global Business Network',
        'Community Development',
        'Long-Term Growth',
      ],
      linkedinUrl: '#', // Add official profile link when available
    },
    {
      name: 'Asha Bhasin',
      role: 'Co-Founder',
      image: '/event-leadership-C1eE1_9Q (1).jpg', // Replace with approved authentic portrait
      statement:
        'Asha Bhasin is part of the leadership team helping build the foundation, community and long-term growth of GBN Circle. Her role reflects the importance of building a strong and sustainable community — one where relationships, trust and collaboration remain at the heart of the GBN Circle experience.',
      focus: [
        'Community Foundation',
        'Member Experience',
        'Community Development',
        'Long-Term Growth',
      ],
      linkedinUrl: '#', // Add official profile link when available
    },
    {
      name: 'Ditya Batra',
      role: 'Chief Inspiration Officer',
      image: '/vision-wide-Dafp-BMf.jpg', // Replace with approved professional portrait
      statement:
        'Ditya Batra is the inspiration behind GBN Circle and the vision of creating a community where people around the world can connect, collaborate and grow together. Her presence represents the human idea at the heart of GBN Circle — that when people come together with purpose, meaningful relationships can create new possibilities.',
      focus: [
        'Inspiration',
        'Human Connection',
        'Community Vision',
        'Connect • Collaborate • Grow',
      ],
      linkedinUrl: null,
    },
  ];

  const leadershipPrinciples = [
    {
      title: 'Meaningful Relationships',
      description:
        'Build relationships based on trust, consistency and genuine interaction.',
    },
    {
      title: 'Collaboration',
      description:
        'Bring together different people, ideas and experiences to create possibilities.',
    },
    {
      title: 'Global Perspective',
      description:
        'Think beyond geographical boundaries and build connections across markets and communities.',
    },
    {
      title: 'Long-Term Growth',
      description:
        'Create relationships and opportunities that continue beyond a single meeting.',
    },
  ];

  const journeySteps = [
    {
      stage: 'VISION',
      description:
        'A vision to bring people together through meaningful business relationships.',
    },
    {
      stage: 'COMMUNITY',
      description:
        'Building a structured and trusted environment for entrepreneurs, professionals and business leaders.',
    },
    {
      stage: 'GLOBAL NETWORK',
      description:
        'Creating opportunities for people to connect, collaborate and grow beyond geographical boundaries.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#070b19] text-white selection:bg-[#c5a059] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-36 pb-20 border-b border-[#1e293b]/60">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(197,160,89,0.12),transparent_70%)] animate-pulse duration-[8000ms]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#e6ca85] text-xs font-semibold tracking-widest uppercase mb-6 transition-all duration-300">
            Leadership
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-6 leading-tight">
            The People Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11]">
              GBN Circle
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            GBN Circle is built with a simple belief — meaningful relationships create meaningful growth.
          </p>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Behind the community is a leadership team committed to building a trusted global business network where entrepreneurs, professionals and business leaders can connect, collaborate and grow together.
          </p>
          <p className="text-[#c5a059] font-medium tracking-widest text-xs md:text-sm uppercase">
            Connect &bull; Collaborate &bull; Grow
          </p>
        </div>
      </section>

      {/* 2. LEADERSHIP INTRODUCTION */}
      <section className="py-20 border-b border-[#1e293b]/60 bg-[#0a1020]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-3">
            Leadership With Purpose
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
            Shaping a Business Community for Genuine Growth
          </h2>
          <p className="text-slate-300 font-light text-base leading-relaxed mb-4">
            GBN Circle is more than a networking platform. It is a community shaped by people who believe in the power of relationships, collaboration and shared growth.
          </p>
          <p className="text-slate-400 font-light text-sm leading-relaxed">
            Our leadership brings together vision, community building and inspiration to create a business network designed for meaningful, long-term connections.
          </p>
        </div>
      </section>

      {/* 3, 4, 5. LEADERSHIP PROFILES (3 CARDS IN ONE ROW ON DESKTOP) */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipProfiles.map((leader, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-b from-[#0d1629] to-[#090e1a] border border-[#1e293b] p-7 flex flex-col justify-between hover:border-[#c5a059]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/30 group"
              >
                <div>
                  {/* Authentic Supplied Photo container */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#070b19] border border-[#1e293b]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Header & Role */}
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-serif text-white">
                      {leader.name}
                    </h3>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-4">
                    {leader.role}
                  </p>

                  {/* Role Statement */}
                  <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                    {leader.statement}
                  </p>
                </div>

                {/* Focus Area & Social Links */}
                <div>
                  <div className="border-t border-[#1e293b] pt-5">
                    <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold block mb-3">
                      Leadership Focus
                    </span>
                    <ul className="space-y-1.5 mb-6">
                      {leader.focus.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-300 flex items-center space-x-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connect with Leader (LinkedIn only if available) */}
                  {leader.linkedinUrl && (
                    <div className="pt-2 border-t border-[#1e293b]/60 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Connect</span>
                      <a
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#e6ca85] hover:text-[#ffd979] transition-colors"
                      >
                        <span>LinkedIn</span>
                        <svg
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP PHILOSOPHY */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-3">
              Leadership Philosophy
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">
              People First. Relationships Always.
            </h2>
            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
              At GBN Circle, leadership is not only about building a network. It is about creating an environment where people can build trust, exchange ideas, discover opportunities and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#070b19] border border-[#1e293b] hover:border-[#c5a059]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-0.5 bg-[#c5a059] mb-5" />
                <h3 className="text-lg md:text-xl font-serif text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR LEADERSHIP JOURNEY */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-3">
              Our Path
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              The Leadership Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {journeySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0e172a]/60 border border-[#1e293b] text-center flex flex-col items-center relative"
              >
                <div className="w-12 h-12 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 text-[#e6ca85] flex items-center justify-center font-serif text-base mb-6">
                  {idx + 1}
                </div>
                <h3 className="text-base tracking-widest uppercase font-serif text-white mb-3">
                  {step.stage}
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR INSPIRATION */}
      <section className="py-24 bg-[#0a1020] border-b border-[#1e293b]/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-3">
            Our Inspiration
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            Inspired by a Simple Idea
          </h2>
          <p className="text-xl font-serif text-slate-200 mb-6">
            People grow when they connect.
          </p>

          <div className="max-w-xl mx-auto border-y border-[#1e293b] py-6 space-y-2 mb-8 text-slate-300 font-light text-base italic">
            <p>A conversation can create an idea.</p>
            <p>A relationship can create trust.</p>
            <p>A connection can create an opportunity.</p>
          </div>

          <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            GBN Circle was created around this simple belief — that bringing the right people together can create meaningful possibilities.
          </p>

          <p className="text-[#c5a059] tracking-widest uppercase text-xs md:text-sm font-medium">
            Connect &bull; Collaborate &bull; Grow
          </p>
        </div>
      </section>

      {/* 9. FINAL LEADERSHIP STATEMENT */}
      <section className="py-24 border-b border-[#1e293b]/60">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            Building the Network. Shaping the Future.
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-6">
            GBN Circle is being built for people who believe that business growth is not only about transactions — it is about relationships, trust, collaboration and shared opportunity.
          </p>
          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
            Together, our leadership is building a global business community where people can connect with purpose, collaborate with confidence and grow together.
          </p>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 text-center bg-[#070b19]">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-3">
            Get Involved
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6">
            Be Part of the GBN Circle
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Connect with a community built around meaningful business relationships, collaboration and long-term growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/community"
              className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#c5a059] text-black font-semibold text-sm hover:bg-[#d4af37] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#c5a059]/10"
            >
              Join GBN Circle
            </Link>
            <Link
              href="/community"
              className="w-full sm:w-auto px-8 py-3.5 rounded-md border border-[#c5a059]/50 text-[#e6ca85] hover:bg-[#c5a059]/10 hover:border-[#c5a059] hover:scale-105 active:scale-95 text-sm font-medium transition-all duration-200"
            >
              Explore the Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}