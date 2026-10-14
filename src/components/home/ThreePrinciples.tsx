"use client";

import Image from "next/image";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

import { Users, Sparkles, TrendingUp } from "lucide-react";

interface ThreePrinciplesProps {
  data?: HomePageContent['threePrinciples'];
}

export default function ThreePrinciples({ data }: ThreePrinciplesProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const heading = isGeorgian ? t.principles.heading : (data?.heading || t.principles.heading);
  const quote = isGeorgian ? t.principles.quote : (data?.quote || t.principles.quote);

  const icons = [Users, Sparkles, TrendingUp];

  const defaultPrinciples = [
    {
      title: t.principles.p1Title,
      desc: t.principles.p1Desc,
    },
    {
      title: t.principles.p2Title,
      desc: t.principles.p2Desc,
    },
    {
      title: t.principles.p3Title,
      desc: t.principles.p3Desc,
    },
  ];

  const principles = isGeorgian
    ? defaultPrinciples
    : (data?.principles && data.principles.length > 0
        ? data.principles.map((item) => ({
            title: item.title,
            desc: item.desc,
          }))
        : defaultPrinciples);

  return (
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300 border-t border-slate-200/80 dark:border-white/5">
      <Image
        src="/vision-wide-Dafp-BMf.jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50/80 dark:from-gbn-navy/80 dark:via-gbn-navy/95 dark:to-gbn-navy/80 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase bg-[#c5a059]/10 text-[#a88235] dark:text-[#e6ca85] border border-[#c5a059]/25 mb-6 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Guiding Tenets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {principles.map((p, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 bg-white dark:bg-[#0c1426]/80 border border-slate-200/90 dark:border-white/10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-[#c5a059]/10 hover:border-[#c5a059]/60 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Accent Line on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059]/20 via-[#c5a059]/10 to-transparent border border-[#c5a059]/30 flex items-center justify-center text-[#a88235] dark:text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059]/25 transition-all duration-300 shadow-sm">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#a88235]/70 dark:text-[#c5a059]/60 uppercase">
                      0{idx + 1} / PRINCIPLE
                    </span>
                  </div>

                  <h3 className="text-xl tracking-[0.18em] uppercase font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#c5a059] mb-4 transition-colors">
                    {p.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-gray-400 font-normal leading-relaxed text-sm">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-3xl mx-auto p-6 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 backdrop-blur-sm">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#a88235] dark:text-[#e5c158] italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
