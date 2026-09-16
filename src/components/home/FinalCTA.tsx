"use client";

import Link from 'next/link';
import { Check, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HomePageContent } from '@/lib/defaultPageContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinalCTAProps {
  data?: HomePageContent['finalCta'];
}

export default function FinalCTA({ data }: FinalCTAProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const badge = isGeorgian ? t.finalCta.badge : (data?.badge || t.finalCta.badge);
  const heading = isGeorgian ? t.finalCta.heading : (data?.heading || t.finalCta.heading);
  const subtitle = isGeorgian ? t.finalCta.subtitle : (data?.subtitle || t.finalCta.subtitle);
  const circleBtnText = isGeorgian ? t.finalCta.circleBtn : (data?.circleBtnText || t.finalCta.circleBtn);
  const circleBtnLink = data?.circleBtnLink || "/community";
  const eliteBtnText = isGeorgian ? t.finalCta.eliteBtn : (data?.eliteBtnText || t.finalCta.eliteBtn);
  const eliteBtnLink = data?.eliteBtnLink || "/contact";
  const footnote =
    data?.footnote ||
    (isGeorgian
      ? "* წევრობის სრული პაკეტები და რეგისტრაციის დეტალები მოგეწოდებათ განაცხადის განხილვის შემდეგ."
      : "* Full membership plans, regional chapter dues, and onboarding schedules are provided upon executive application review.");

  const comparisonRows = isGeorgian
    ? [
        { feature: 'ბიზნესის კრიტერიუმი', circle: '₹20L+ წლიური ბრუნვა', elite: '₹5Cr+ წლიური ბრუნვა', isHighlight: true },
        { feature: 'წევრობის პერიოდულობა', circle: 'კვარტალური / წლიური', elite: 'ყოველთვიური / წლიური', isHighlight: false },
        { feature: 'ონლაინ შეხვედრები', circle: true, elite: false, isHighlight: false },
        { feature: 'პირისპირ ნეთვორქინგი', circle: true, elite: true, isHighlight: false },
        { feature: 'წევრების პრეზენტაციები', circle: true, elite: true, isHighlight: false },
        { feature: 'თანამშრომლობის შესაძლებლობები', circle: true, elite: true, isHighlight: false },
        { feature: 'პრემიუმ დილის გამოცდილება', circle: false, elite: true, isHighlight: false },
        { feature: 'საუზმის გამოცდილება', circle: false, elite: true, isHighlight: false },
        { feature: 'სტრატეგიული ნეთვორქინგი', circle: true, elite: true, isHighlight: false },
        { feature: 'ფასები და დონეები', circle: 'დეტალები მოთხოვნით', elite: 'დეტალები მოთხოვნით', isHighlight: false, isPricing: true },
      ]
    : [
        { feature: 'Business Eligibility', circle: '₹20L+ annual turnover', elite: '₹5Cr+ annual turnover', isHighlight: true },
        { feature: 'Membership Frequency', circle: 'Quarterly / Annual', elite: 'Monthly / Annual', isHighlight: false },
        { feature: 'Online Meetings', circle: true, elite: false, isHighlight: false },
        { feature: 'Physical Networking', circle: true, elite: true, isHighlight: false },
        { feature: 'Member Presentations', circle: true, elite: true, isHighlight: false },
        { feature: 'Collaboration Opportunities', circle: true, elite: true, isHighlight: false },
        { feature: 'Premium Morning Experience', circle: false, elite: true, isHighlight: false },
        { feature: 'Breakfast Experience', circle: false, elite: true, isHighlight: false },
        { feature: 'Strategic Networking', circle: true, elite: true, isHighlight: false },
        { feature: 'Pricing & Tiers', circle: 'Full details on request', elite: 'Full details on request', isHighlight: false, isPricing: true },
      ];

  return (
    <section className="py-24 bg-slate-100 dark:bg-[#070b19] text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Ambience & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#070b19] dark:via-[#091024] dark:to-[#070b19] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-5">
            <Sparkles size={12} /> {badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-5 leading-tight font-bold">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Complete Comparison Matrix */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0a1020]/90 backdrop-blur-md overflow-hidden shadow-xl dark:shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-8 items-center">
            <div className="col-span-5 sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {isGeorgian ? "შეფასების კრიტერიუმები" : "Evaluation Criteria"}
            </div>

            {/* GBN Circle Column Header */}
            <div className="col-span-3 sm:col-span-4 text-center px-2">
              <span className="inline-block text-xs sm:text-sm uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-md bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                GBN Circle
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-2 tracking-wide font-sans">
                ₹20L+ {isGeorgian ? "ბრუნვა" : "Cohort"}
              </p>
            </div>

            {/* GBN Elite Column Header */}
            <div className="col-span-4 text-center px-2">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black shadow-md">
                <ShieldCheck size={14} /> GBN Elite
              </span>
              <p className="text-base sm:text-lg font-bold text-[#a88235] dark:text-[#f3d37a] mt-2 tracking-wide font-sans">
                ₹5Cr+ {isGeorgian ? "საბჭო" : "Council"}
              </p>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 py-4.5 sm:py-5.5 px-4 sm:px-8 items-center transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/25 ${
                  row.isHighlight
                    ? 'bg-[#c5a059]/10'
                    : idx % 2 === 0
                    ? 'bg-transparent'
                    : 'bg-slate-50/50 dark:bg-slate-950/30'
                }`}
              >
                {/* Feature Label */}
                <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm md:text-base pr-2">
                  {row.feature}
                </div>

                {/* GBN Circle Value */}
                <div className="col-span-3 sm:col-span-4 text-center px-2">
                  {typeof row.circle === 'boolean' ? (
                    row.circle ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 shadow-sm">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold">
                        <Minus size={18} strokeWidth={2.5} />
                      </span>
                    )
                  ) : (
                    <span
                      className={`text-xs sm:text-sm md:text-base ${
                        row.isHighlight ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-200 font-medium'
                      }`}
                    >
                      {row.circle}
                    </span>
                  )}
                </div>

                {/* GBN Elite Value */}
                <div className="col-span-4 text-center px-2">
                  {typeof row.elite === 'boolean' ? (
                    row.elite ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059]/20 dark:bg-[#c5a059]/25 border border-[#c5a059] text-[#a88235] dark:text-[#f3d37a] shadow-sm">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold">
                        <Minus size={18} strokeWidth={2.5} />
                      </span>
                    )
                  ) : (
                    <span
                      className={`text-xs sm:text-sm md:text-base ${
                        row.isHighlight ? 'text-[#a88235] dark:text-[#f3d37a] font-bold' : 'text-[#a88235] dark:text-[#e5c158] font-medium'
                      }`}
                    >
                      {row.elite}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer: Dual Action Buttons */}
          <div className="grid grid-cols-12 py-6 px-4 sm:px-8 bg-slate-50 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 items-center gap-3 sm:gap-4">
            <div className="col-span-12 sm:col-span-4 mb-3 sm:mb-0 text-center sm:text-left">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-slate-900 dark:text-slate-300 font-bold block">
                {isGeorgian ? "შემდეგი ნაბიჯები" : "Next Steps"}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-0.5">
                {isGeorgian ? "აირჩიეთ თქვენი დონე განაცხადისთვის." : "Select your qualifying tier to apply."}
              </p>
            </div>

            {/* CTA 1: Join GBN Circle */}
            <div className="col-span-6 sm:col-span-4 px-1 sm:px-2">
              <Link
                href={circleBtnLink}
                className="w-full py-3.5 sm:py-4 px-3 sm:px-5 rounded-md border border-slate-300 dark:border-white/20 hover:border-[#c5a059] bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white hover:text-[#c5a059] dark:hover:text-[#c5a059] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <span>{circleBtnText}</span>
                <ArrowRight size={15} className="hidden sm:inline" />
              </Link>
            </div>

            {/* CTA 2: Apply for GBN Elite */}
            <div className="col-span-6 sm:col-span-4 px-1 sm:px-2">
              <Link
                href={eliteBtnLink}
                className="w-full py-3.5 sm:py-4 px-3 sm:px-5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all hover:scale-[1.02] shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <span>{eliteBtnText}</span>
                <ArrowRight size={15} className="hidden sm:inline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Note */}
        <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-6 italic">
          {footnote}
        </p>
      </div>
    </section>
  );
}
