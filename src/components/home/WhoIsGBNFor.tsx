"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhoIsGBNForProps {
  data?: HomePageContent['whoIsGbnFor'];
}

export default function WhoIsGBNFor({ data }: WhoIsGBNForProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const badge = isGeorgian ? t.whoIsGbnFor.badge : (data?.badge || t.whoIsGbnFor.badge);
  const heading = isGeorgian ? t.whoIsGbnFor.heading : (data?.heading || t.whoIsGbnFor.heading);
  const intro = isGeorgian ? t.whoIsGbnFor.intro : (data?.intro || t.whoIsGbnFor.intro);
  const circleEligibility = isGeorgian
    ? t.whoIsGbnFor.circleEligibility
    : (data?.circleEligibility || t.whoIsGbnFor.circleEligibility);
  const eliteEligibility = isGeorgian
    ? t.whoIsGbnFor.eliteEligibility
    : (data?.eliteEligibility || t.whoIsGbnFor.eliteEligibility);
  const btnText = isGeorgian ? t.whoIsGbnFor.btn : (data?.btnText || t.whoIsGbnFor.btn);
  const btnLink = data?.btnLink || "/community";

  const cards = isGeorgian
    ? t.whoIsGbnFor.cards
    : (data?.roles && data.roles.length > 0 ? data.roles : t.whoIsGbnFor.cards);

  return (
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300">
      <Image
        src="/event-networking-BdmXOEy2 (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/95 to-slate-50 dark:from-gbn-navy dark:via-gbn-navy/95 dark:to-gbn-navy pointer-events-none"></div>

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

          <p className="text-base sm:text-lg text-slate-900 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>

        {/* 5 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-gbn-navy-light/40 border border-slate-200 dark:border-white/5 rounded-sm hover:border-[#c5a059]/50 hover:bg-white dark:hover:bg-gbn-navy-light/70 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:shadow-none"
            >
              <div>
                <h3 className="text-lg font-serif text-slate-900 dark:text-white group-hover:text-[#c5a059] dark:group-hover:text-gbn-gold transition-colors mb-2">
                  {card.title}
                </h3>
              </div>
              <p className="text-slate-800 dark:text-gray-400 font-normal text-xs leading-relaxed mt-2">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Eligibility Criteria Cards (PRD Section 4) */}
        <div className="p-8 bg-white dark:bg-gbn-navy-light/30 border border-slate-200 dark:border-white/5 rounded-sm mb-12 shadow-sm dark:shadow-none">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0 mt-1">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                  GBN Circle
                </h4>
                <p className="text-xs text-slate-800 dark:text-gray-300 font-normal leading-relaxed">
                  {circleEligibility}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0 mt-1">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#a88235] dark:text-[#e5c158] mb-1">
                  GBN Elite
                </h4>
                <p className="text-xs text-slate-800 dark:text-gray-300 font-normal leading-relaxed">
                  {eliteEligibility}
                </p>
              </div>
            </div>
          </div>
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
