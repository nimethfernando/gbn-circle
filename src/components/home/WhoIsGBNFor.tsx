"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Rocket,
  Building2,
  Briefcase,
  Lightbulb,
  Crown,
  Sparkles,
} from "lucide-react";
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

  const roleIcons = [
    Rocket,
    Building2,
    Briefcase,
    Lightbulb,
    Crown,
  ];

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

          <p className="text-base sm:text-lg text-slate-800 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>

        {/* 5 Member Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {cards.map((card, idx) => {
            const IconComponent = roleIcons[idx % roleIcons.length];
            return (
              <div
                key={idx}
                className="p-7 bg-white dark:bg-[#0c1426]/80 border border-slate-200/90 dark:border-white/10 rounded-2xl hover:border-[#c5a059]/60 hover:bg-white dark:hover:bg-[#111c33] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-[#c5a059]/10 hover:-translate-y-1.5 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Top Accent Line on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c5a059]/15 via-[#c5a059]/10 to-transparent border border-[#c5a059]/30 flex items-center justify-center text-[#a88235] dark:text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059]/25 transition-all duration-300 shadow-sm">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#a88235]/70 dark:text-[#c5a059]/60 uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#c5a059] transition-colors mb-2.5">
                    {card.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-300 font-normal text-xs leading-relaxed mt-1">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Eligibility Criteria Cards (PRD Section 4) */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {/* Card 1: GBN Circle */}
          <div className="rounded-2xl p-7 sm:p-8 bg-white dark:bg-[#0c1426]/85 border border-slate-200/90 dark:border-white/10 hover:border-[#c5a059]/50 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/35 flex items-center justify-center text-[#a88235] dark:text-[#c5a059] shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                    GBN Circle
                  </h4>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#a88235] dark:text-[#c5a059] border border-[#c5a059]/30">
                    Founders & CXOs
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {circleEligibility}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: GBN Elite */}
          <div className="rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-amber-50/60 via-white to-white dark:from-[#131d36] dark:via-[#0c1426] dark:to-[#0c1426] border-2 border-[#c5a059]/40 hover:border-[#c5a059] shadow-md hover:shadow-2xl shadow-[#c5a059]/10 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#977328] text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#c5a059]/30 group-hover:scale-110 transition-transform">
                <Crown size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <h4 className="text-xl font-serif font-bold text-gradient-gold">
                    GBN Elite
                  </h4>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-slate-950 font-bold shadow-xs flex items-center gap-1">
                    <Sparkles size={11} /> Enterprise Council
                  </span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
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
