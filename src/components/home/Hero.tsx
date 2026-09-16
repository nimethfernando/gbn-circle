"use client";

import Link from "next/link";
import { HomePageContent } from "@/lib/defaultPageContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroProps {
  data?: HomePageContent['hero'];
}

export default function Hero({ data }: HeroProps = {}) {
  const { t, language } = useLanguage();

  const isGeorgian = language === 'ka';
  const badge = isGeorgian ? t.hero.badge : (data?.badge || t.hero.badge);
  const headingLine1 = isGeorgian ? t.hero.headingLine1 : (data?.headingLine1 || t.hero.headingLine1);
  const headingLine2 = isGeorgian ? t.hero.headingLine2 : (data?.headingLine2 || t.hero.headingLine2);
  const subtitle = isGeorgian ? t.hero.subtitle : (data?.subtitle || t.hero.subtitle);
  const primaryBtnText = isGeorgian ? t.hero.primaryBtn : (data?.primaryBtnText || t.hero.primaryBtn);
  const primaryBtnLink = data?.primaryBtnLink || "/community";
  const secondaryBtnText = isGeorgian ? t.hero.secondaryBtn : (data?.secondaryBtnText || t.hero.secondaryBtn);
  const secondaryBtnLink = data?.secondaryBtnLink || "/community";

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-start pt-28 pb-16 overflow-hidden text-left bg-slate-50 dark:bg-gbn-navy transition-colors duration-300">
      {/* Background Image with Adaptive Overlay */}
      <div className="absolute inset-0 bg-[url('/vision-wide-Dafp-BMf.jpg')] bg-cover bg-center bg-no-repeat opacity-25 dark:opacity-40 animate-slow-zoom pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent dark:from-gbn-navy-dark dark:via-gbn-navy/80 dark:to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-gbn-navy-dark dark:via-transparent dark:to-transparent pointer-events-none"></div>

      <div className="container relative mx-auto px-6 md:px-12 z-10 max-w-7xl mt-6 sm:mt-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
            <div
              className="h-px w-12 bg-gold-gradient animate-draw-line"
              style={{
                animationDelay: '0.2s',
                background:
                  'linear-gradient(to right, transparent, var(--color-gbn-gold))',
              }}
            ></div>
            <p className="text-[#a88235] dark:text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
              {badge}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white mb-6 leading-[1.15] tracking-tight animate-fade-in-up delay-100">
            {headingLine1}{' '}
            <br className="hidden md:block" />
            <span className="text-gradient-gold">{headingLine2}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-gray-300 font-light mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in-up delay-300">
            <Link
              href={primaryBtnLink}
              className="w-full sm:w-auto bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:scale-105 flex items-center justify-center uppercase hover-shine shadow-md"
            >
              {primaryBtnText}
            </Link>
            <Link
              href={secondaryBtnLink}
              className="w-full sm:w-auto bg-white/80 dark:bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:border-[#c5a059] dark:hover:border-gbn-gold hover:text-[#c5a059] dark:hover:text-gbn-gold uppercase shadow-sm dark:shadow-none"
            >
              {secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
