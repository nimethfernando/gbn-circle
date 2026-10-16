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

          <div className="space-y-4 text-base sm:text-lg text-slate-900 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
            <p>{description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {points.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white dark:bg-[#0c1426]/80 border border-slate-200/90 dark:border-white/10 hover:border-[#c5a059]/60 hover:bg-white dark:hover:bg-[#111c33] hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-2xl hover:shadow-[#c5a059]/10 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Line on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <div className="mb-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059]/20 via-[#c5a059]/10 to-transparent border border-[#c5a059]/30 flex items-center justify-center text-[#a88235] dark:text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059]/25 transition-all duration-300 shadow-sm">
                  {point.icon}
                </div>
                <h3 className="text-base uppercase tracking-wider font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#c5a059] mb-3 transition-colors">
                  {point.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-normal text-xs sm:text-sm leading-relaxed mt-1">
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
