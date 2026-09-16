"use client";

import Image from "next/image";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface ThreePrinciplesProps {
  data?: HomePageContent['threePrinciples'];
}

export default function ThreePrinciples({ data }: ThreePrinciplesProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const heading = isGeorgian ? t.principles.heading : (data?.heading || t.principles.heading);
  const quote = isGeorgian ? t.principles.quote : (data?.quote || t.principles.quote);

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
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300">
      <Image
        src="/vision-wide-Dafp-BMf.jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50/80 dark:from-gbn-navy/80 dark:via-gbn-navy/95 dark:to-gbn-navy/80 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-10 bg-white dark:bg-gbn-navy-light/40 border border-slate-200 dark:border-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-500 shadow-sm dark:shadow-none group"
            >
              <h3 className="text-xl tracking-[0.2em] uppercase font-bold text-[#a88235] dark:text-gbn-gold mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">
                {p.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#a88235] dark:text-gbn-gold italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
