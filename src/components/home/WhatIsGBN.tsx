import { Users, Handshake, Network, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WhatIsGBN() {
  const points = [
    {
      title: "Meet People",
      description: "Connect with entrepreneurs, professionals and business leaders.",
      icon: <Users className="w-5 h-5 text-gbn-gold" />,
    },
    {
      title: "Build Relationships",
      description: "Develop meaningful business relationships over time.",
      icon: <Handshake className="w-5 h-5 text-gbn-gold" />,
    },
    {
      title: "Exchange Opportunities",
      description: "Share referrals, ideas, expertise and business possibilities.",
      icon: <Network className="w-5 h-5 text-gbn-gold" />,
    },
    {
      title: "Collaborate & Grow",
      description: "Turn relationships into collaboration and long-term growth.",
      icon: <TrendingUp className="w-5 h-5 text-gbn-gold" />,
    },
  ];

  return (
    <section className="py-24 bg-gbn-navy relative overflow-hidden">
      <Image
        src="/event-global-CKOLaEg2 (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.07] pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-gbn-navy via-gbn-navy/90 to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
              What is GBN Circle?
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            A Business Network Built Around Meaningful Relationships.
          </h2>

          <div className="space-y-4 text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
            <p>Networking should be more than exchanging business cards.</p>
            <p>
              GBN Circle brings entrepreneurs, professionals and business leaders together
              through structured networking experiences designed to create meaningful
              relationships, exchange opportunities and encourage collaboration.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {points.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-md bg-gbn-navy-light/50 border border-white/5 hover:border-gbn-gold/50 hover:bg-gbn-navy-light transition-all duration-500 group premium-shadow"
            >
              <div className="mb-8 p-3 bg-white/5 border border-white/10 rounded-sm inline-block group-hover:bg-gbn-gold/10 transition-colors">
                {point.icon}
              </div>
              <h3 className="text-sm uppercase tracking-wider font-bold text-white group-hover:text-gbn-gold mb-3 transition-colors">
                {point.title}
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-transparent border border-white/20 text-white text-xs tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase shadow-sm group"
          >
            <span>Discover GBN Circle</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
