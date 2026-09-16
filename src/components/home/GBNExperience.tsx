"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface GBNExperienceProps {
  data?: HomePageContent['gbnExperience'];
}

export default function GBNExperience({ data }: GBNExperienceProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const heading = isGeorgian ? t.experience.heading : (data?.heading || t.experience.heading);
  const subtitle = isGeorgian ? t.experience.subtitle : (data?.subtitle || t.experience.subtitle);

  const circleTitle = "GBN Circle";
  const circleBadge = isGeorgian ? t.experience.circleBadge : (data?.circleBadge || t.experience.circleBadge);
  const circleDesc = isGeorgian ? t.experience.circleDesc : (data?.circleDesc || t.experience.circleDesc);
  const circleFeatures = isGeorgian
    ? [
        "ონლაინ ნეთვორქინგი",
        "პირისპირ შეხვედრები",
        "წევრების პრეზენტაციები",
        "საქმიანი გაცნობა",
        "შესაძლებლობების გაცვლა",
        "ცოდნის გაზიარება",
        "თანამშრომლობის პერსპექტივები",
        "გლობალური ბიზნეს კავშირები",
      ]
    : (data?.circleFeatures && data.circleFeatures.length > 0
        ? data.circleFeatures
        : [
            "Online networking",
            "Physical networking",
            "Member presentations",
            "Business introductions",
            "Networking & opportunity exchange",
            "Knowledge sharing",
            "Collaboration opportunities",
            "Global business connections",
          ]);
  const circleBtnText = isGeorgian ? t.experience.circleBtn : (data?.circleBtnText || t.experience.circleBtn);
  const circleBtnLink = data?.circleBtnLink || "/community";

  const eliteTitle = "GBN Elite";
  const eliteBadge = isGeorgian ? t.experience.eliteBadge : (data?.eliteBadge || t.experience.eliteBadge);
  const eliteDesc = isGeorgian ? t.experience.eliteDesc : (data?.eliteDesc || t.experience.eliteDesc);
  const eliteFeatures = isGeorgian
    ? [
        "პრემიუმ დილის ნეთვორქინგი",
        "მაღალი ღირებულების გაცნობა",
        "სტრატეგიული დიალოგი",
        "ფოკუსირებული თანამშრომლობა",
        "ხელმძღვანელების დონის შეხვედრა",
        "საუზმე შედის გამოცდილებაში",
      ]
    : (data?.eliteFeatures && data.eliteFeatures.length > 0
        ? data.eliteFeatures
        : [
            "Premium morning networking",
            "High-value introductions",
            "Strategic conversations",
            "Focused collaboration",
            "Leadership-level networking",
            "Breakfast included in the experience",
          ]);
  const eliteBtnText = isGeorgian ? t.experience.eliteBtn : (data?.eliteBtnText || t.experience.eliteBtn);
  const eliteBtnLink = data?.eliteBtnLink || "/community";

  return (
    <section className="py-24 bg-white dark:bg-gbn-navy text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <Image
        src="/event-leadership-C1eE1_9Q (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white dark:from-gbn-navy dark:via-gbn-navy/90 dark:to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Card 1: GBN Circle */}
          <div className="bg-slate-50 dark:bg-gbn-navy-light/40 border border-slate-200 dark:border-white/5 rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col shadow-sm dark:shadow-none group">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-2">{circleTitle}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600 dark:text-gray-400 mb-6 border border-slate-300 dark:border-white/10 inline-block px-3 py-1">
                {circleBadge}
              </p>
              <p className="text-slate-600 dark:text-gray-300 font-light leading-relaxed">
                {circleDesc}
              </p>
            </div>

            <div className="flex-grow">
              <h4 className="text-xs tracking-widest uppercase font-bold text-slate-900 dark:text-white mb-4">
                {isGeorgian ? "მოიცავს" : "Includes"}
              </h4>
              <ul className="space-y-3 mb-8 text-sm">
                {circleFeatures.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start text-slate-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#a88235] dark:text-gray-400 mr-3 shrink-0 mt-0.5" />
                    <span className="font-light">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
              <Link
                href={circleBtnLink}
                className="w-full bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:border-[#c5a059] dark:hover:border-gbn-gold hover:text-[#c5a059] dark:hover:text-gbn-gold uppercase flex items-center justify-center"
              >
                {circleBtnText}
              </Link>
            </div>
          </div>

          {/* Card 2: GBN Elite */}
          <div className="bg-slate-50 dark:bg-gbn-navy-light/60 border-2 border-[#c5a059]/40 dark:border-gbn-gold/30 rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col shadow-md dark:shadow-none group">
            <div className="absolute top-0 right-0 bg-[#c5a059] text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
              Executive
            </div>

            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-2">{eliteTitle}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#a88235] dark:text-gbn-gold mb-6 border border-[#c5a059]/40 dark:border-gbn-gold/30 inline-block px-3 py-1">
                {eliteBadge}
              </p>
              <p className="text-slate-600 dark:text-gray-300 font-light leading-relaxed">
                {eliteDesc}
              </p>
            </div>

            <div className="flex-grow">
              <h4 className="text-xs tracking-widest uppercase font-bold text-slate-900 dark:text-white mb-4">
                {isGeorgian ? "მოიცავს" : "Includes"}
              </h4>
              <ul className="space-y-3 mb-8 text-sm">
                {eliteFeatures.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start text-slate-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-[#c5a059] mr-3 shrink-0 mt-0.5" />
                    <span className="font-light">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
              <Link
                href={eliteBtnLink}
                className="w-full bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:scale-[1.02] uppercase flex items-center justify-center shadow-md"
              >
                {eliteBtnText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
