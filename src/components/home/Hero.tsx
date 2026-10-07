"use client";

import Link from "next/link";
import { Download } from "lucide-react";
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

  const showBrochureBtn = Boolean(data?.showBrochureBtn);
  const brochureUrl = data?.brochureUrl || "/brochure.pdf";
  const brochureBtnText = isGeorgian ? t.hero.brochureBtn : (data?.brochureBtnText || t.hero.brochureBtn);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-start pt-28 pb-16 overflow-hidden text-left bg-slate-50 dark:bg-gbn-navy transition-colors duration-300">
      {/* Background Image with Adaptive Overlay */}
      <div className="absolute inset-0 bg-[url('/vision-wide-Dafp-BMf.jpg')] bg-cover bg-center bg-no-repeat opacity-25 dark:opacity-40 animate-slow-zoom pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent dark:from-gbn-navy-dark dark:via-gbn-navy/80 dark:to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-gbn-navy-dark dark:via-transparent dark:to-transparent pointer-events-none"></div>

      <div className="container relative mx-auto px-6 md:px-12 z-10 max-w-7xl mt-6 sm:mt-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3.5 mb-6 animate-fade-in-up">
            <div className="w-8 sm:w-12 h-[2px] rounded-full shrink-0 overflow-hidden bg-[#c5a059]/20">
              <div
                className="h-full w-full bg-gradient-to-r from-transparent via-[#c5a059] to-[#dfbb66] animate-draw-line"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
            <p className="text-[#a88235] dark:text-[#c5a059] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-xs sm:text-[13px] font-bold whitespace-nowrap shrink-0 drop-shadow-xs">
              {badge}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white mb-6 leading-[1.12] tracking-tight animate-fade-in-up delay-100">
            {headingLine1}{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-gold drop-shadow-sm">{headingLine2}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-300 font-normal mb-8 sm:mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-5 animate-fade-in-up delay-300">
            <Link
              href={primaryBtnLink}
              className="w-full sm:w-auto bg-gradient-to-r from-gbn-gold to-gbn-gold-hover hover:from-gbn-gold-hover hover:to-[#dfbb66] text-gbn-navy-dark text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center uppercase hover-shine shadow-lg shadow-[#c5a059]/15 text-center cursor-pointer"
            >
              {primaryBtnText}
            </Link>
            <Link
              href={secondaryBtnLink}
              className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-300 dark:border-white/20 hover:border-[#c5a059] dark:hover:border-gbn-gold text-slate-950 dark:text-white hover:text-[#c5a059] dark:hover:text-gbn-gold text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] uppercase shadow-sm text-center cursor-pointer"
            >
              {secondaryBtnText}
            </Link>
            {showBrochureBtn && brochureUrl && (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full sm:w-auto bg-[#c5a059]/15 hover:bg-[#c5a059]/25 border border-[#c5a059]/50 text-[#a88235] dark:text-[#f3d38c] hover:text-[#806020] dark:hover:text-white text-xs tracking-[0.15em] font-bold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase shadow-sm text-center group cursor-pointer hover:scale-[1.02]"
                title={brochureBtnText}
              >
                <Download size={15} className="text-[#a88235] dark:text-[#f3d38c] group-hover:scale-110 transition-transform" />
                <span>{brochureBtnText}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
