"use client";

import { Users, Handshake, Network, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatIsGBNProps {
  data?: HomePageContent['whatIsGbn'];
}

export default function WhatIsGBN({ data }: WhatIsGBNProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const badge = isGeorgian ? t.whatIsGbn.badge : (data?.badge || t.whatIsGbn.badge);
  const heading = isGeorgian ? t.whatIsGbn.heading : (data?.heading || t.whatIsGbn.heading);
  const description = isGeorgian ? t.whatIsGbn.desc : (data?.description || t.whatIsGbn.desc);
  const btnText = isGeorgian ? t.whatIsGbn.btn : (data?.btnText || t.whatIsGbn.btn);
  const btnLink = data?.btnLink || "/about";

  const icons = [
    <Users key="1" className="w-5 h-5 text-[#c5a059]" />,
    <Handshake key="2" className="w-5 h-5 text-[#c5a059]" />,
    <Network key="3" className="w-5 h-5 text-[#c5a059]" />,
    <TrendingUp key="4" className="w-5 h-5 text-[#c5a059]" />,
  ];

  const pillarsData = isGeorgian
    ? t.whatIsGbn.pillars
    : (data?.pillars && data.pillars.length > 0 ? data.pillars : t.whatIsGbn.pillars);

  const points = pillarsData.map((p, i) => ({
    title: p.title,
    description: p.desc,
    icon: icons[i % icons.length],
  }));

  return (
    <section className="py-24 bg-white dark:bg-gbn-navy relative overflow-hidden transition-colors duration-300">
      <Image
        src="/event-global-CKOLaEg2 (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-[0.07] pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/95 to-slate-50 dark:from-gbn-navy dark:via-gbn-navy/90 dark:to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#c5a059] rounded-full"></div>
            <p className="text-[#a88235] dark:text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
              {badge}
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 leading-tight">
            {heading}
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl">
            <p>{description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {points.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-md bg-slate-50/90 dark:bg-gbn-navy-light/50 border border-slate-200/80 dark:border-white/5 hover:border-[#c5a059]/50 hover:bg-white dark:hover:bg-gbn-navy-light transition-all duration-500 group shadow-sm dark:shadow-none"
            >
              <div className="mb-8 p-3 bg-slate-200/50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 rounded-sm inline-block group-hover:bg-[#c5a059]/10 transition-colors">
                {point.icon}
              </div>
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-900 dark:text-white group-hover:text-[#c5a059] dark:group-hover:text-gbn-gold mb-3 transition-colors">
                {point.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 font-light text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-start">
          <Link
            href={btnLink}
            className="inline-flex items-center gap-2 text-slate-900 dark:text-white hover:text-[#c5a059] dark:hover:text-gbn-gold font-semibold tracking-wider text-xs uppercase group transition-colors"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
