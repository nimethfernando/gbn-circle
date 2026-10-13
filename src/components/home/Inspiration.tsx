"use client";

import Link from "next/link";
import { ArrowRight, Users, Sparkles, TrendingUp, Quote, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HomePageContent } from "@/lib/defaultPageContent";

interface InspirationProps {
  data?: HomePageContent['inspiration'];
}

export default function Inspiration({ data }: InspirationProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  // Section fields with internationalization & CMS data fallback
  const badge = isGeorgian ? t.inspiration.badge : (data?.badge || t.inspiration.badge || "The Philosophy");
  const rawHeading = isGeorgian ? t.inspiration.heading : (data?.heading || t.inspiration.heading);
  const quote = isGeorgian ? t.inspiration.quote : (data?.quote || t.inspiration.quote);
  const btnText = isGeorgian ? t.inspiration.btn : (data?.btnText || t.inspiration.btn);
  const btnLink = data?.btnLink || "/about";

  // Three Pillars data
  const connectTitle = isGeorgian ? t.inspiration.connect : (data?.connectTitle || t.inspiration.connect);
  const connectDesc = isGeorgian
    ? t.inspiration.connectDesc
    : (data?.connectDesc || t.inspiration.connectDesc);

  const createTitle = isGeorgian ? t.inspiration.create : (data?.createTitle || t.inspiration.create);
  const createDesc = isGeorgian
    ? t.inspiration.createDesc
    : (data?.createDesc || t.inspiration.createDesc);

  const growTitle = isGeorgian ? t.inspiration.grow : (data?.growTitle || t.inspiration.grow);
  const growDesc = isGeorgian
    ? t.inspiration.growDesc
    : (data?.growDesc || t.inspiration.growDesc);

  // Split heading into two parts if it contains a sentence break or dot for two-tone gold styling
  const splitHeading = () => {
    if (rawHeading.includes(".")) {
      const parts = rawHeading.split(".");
      return {
        main: parts[0] + ".",
        accent: parts.slice(1).join(".").trim(),
      };
    }
    return {
      main: rawHeading,
      accent: "",
    };
  };

  const headingParts = splitHeading();

  const pillars = [
    {
      num: "01",
      tag: isGeorgian ? "01 • კავშირი" : "01 • Relationships",
      title: connectTitle,
      desc: connectDesc,
      feature: isGeorgian ? "ნამდვილი ურთიერთობები" : "Curated Introductions",
      icon: <Users className="w-7 h-7" />,
    },
    {
      num: "02",
      tag: isGeorgian ? "02 • სინერგია" : "02 • Opportunity",
      title: createTitle,
      desc: createDesc,
      feature: isGeorgian ? "საერთო შესაძლებლობები" : "Collaborative Ventures",
      icon: <Sparkles className="w-7 h-7" />,
    },
    {
      num: "03",
      tag: isGeorgian ? "03 • განვითარება" : "03 • Longevity",
      title: growTitle,
      desc: growDesc,
      feature: isGeorgian ? "გრძელვადიანი ზრდა" : "Enduring Business Value",
      icon: <TrendingUp className="w-7 h-7" />,
    },
  ];

  return (
    <section className="py-24 sm:py-32 md:py-36 bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-[#060a17] dark:via-gbn-navy dark:to-[#060a17] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Ambient Luxury Atmospheric Flares */}
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-gradient-to-b from-[#c5a059]/15 via-[#c5a059]/5 to-transparent blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-[#152a55]/20 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Decorative Subtle Concentric Gold Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full border border-[#c5a059]/5 dark:border-[#c5a059]/10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] md:w-[1050px] md:h-[1050px] rounded-full border border-[#c5a059]/[0.03] dark:border-[#c5a059]/[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center">
        {/* 1. Refined Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase bg-[#c5a059]/10 text-[#a88235] dark:text-[#e6ca85] border border-[#c5a059]/25 mb-8 shadow-xs backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>{badge}</span>
        </div>

        {/* 2. Heading with Gold Gradient Elegance */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-10 max-w-4xl mx-auto">
          {headingParts.main}{" "}
          {headingParts.accent && (
            <span className="text-gradient-gold block sm:inline mt-1 sm:mt-0">
              {headingParts.accent}
            </span>
          )}
        </h2>

        {/* 3. Executive Quote Presentation */}
        <div className="relative max-w-3xl mx-auto mb-16 p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/50 group hover:border-[#c5a059]/40 transition-all duration-500">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#a88235] text-slate-950 flex items-center justify-center shadow-lg shadow-[#c5a059]/30">
            <Quote className="w-5 h-5 fill-current" />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-serif font-light text-slate-800 dark:text-slate-200 leading-relaxed italic text-balance mb-6">
            &ldquo;{quote}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#a88235] dark:text-[#c5a059]">
            <span className="w-8 h-px bg-[#c5a059]/40"></span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#c5a059]" />
              {isGeorgian ? "დიტია ბატრა • GBN-ის შთაგონება" : "Ditya Batra • GBN Inspiration"}
            </span>
            <span className="w-8 h-px bg-[#c5a059]/40"></span>
          </div>
        </div>

        {/* 4. The 3 Core Pillars (Action Cards) */}
        <div className="relative mb-16">
          {/* Desktop Connecting Line between cards */}
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent -translate-y-8 z-0 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-9 rounded-2xl bg-white dark:bg-[#0c1426]/90 border border-slate-200/90 dark:border-white/10 hover:border-[#c5a059]/60 dark:hover:border-[#c5a059]/60 hover:-translate-y-2 transition-all duration-500 shadow-lg dark:shadow-xl dark:shadow-black/40 hover:shadow-2xl hover:shadow-[#c5a059]/15 group text-center flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-md"
              >
                {/* Top Subtle Gold Accent Line on Hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-full flex flex-col items-center">
                  {/* Pillar Icon Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-5 border border-[#c5a059]/20 group-hover:scale-110 group-hover:bg-[#c5a059] group-hover:text-slate-950 transition-all duration-500 shadow-sm">
                    {pillar.icon}
                  </div>

                  {/* Step / Pillar Eyebrow */}
                  <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#a88235] dark:text-[#c5a059] mb-2.5">
                    {pillar.tag}
                  </div>

                  {/* Main Action Title (Connect people. / Create possibilities. / Grow together.) */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#c5a059] dark:group-hover:text-[#e6ca85] transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Pillar Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom Feature Accent */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 w-full flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#c5a059] transition-colors">
                    {pillar.feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Luxury Executive Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <Link
            href={btnLink}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#b38838] via-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-[#c5a059]/25 hover:shadow-2xl hover:shadow-[#c5a059]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {isGeorgian
              ? "გაეცანით ჩვენს ხედვას, ხელმძღვანელობასა და საერთაშორისო საზოგადოებას"
              : "Explore our founding vision, community leadership & global network"}
          </span>
        </div>
      </div>
    </section>
  );
}
