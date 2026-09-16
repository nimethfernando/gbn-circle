"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GlobalNetwork() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <Image
        src="/event-global-CKOLaEg2 (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-50 dark:from-gbn-navy dark:via-gbn-navy/80 dark:to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            {t.globalNetwork.heading}{" "}
            <span className="text-gradient-gold">
              {t.globalNetwork.headingHighlight}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-light">
            {t.globalNetwork.desc}
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-md bg-white dark:bg-gbn-navy-light/40 h-64 md:h-96 overflow-hidden flex items-center justify-center shadow-md dark:shadow-none group border border-slate-200 dark:border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-slate-100 dark:from-gbn-navy-light/50 dark:via-gbn-navy dark:to-gbn-navy"></div>

          {/* Conceptual World Map Animation / Visualization placeholder */}
          <div className="absolute inset-0 opacity-40 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 100 50"
              className="w-[120%] h-[120%] text-slate-900 dark:text-white fill-current animate-float"
            >
              <path
                d="M10,25 Q30,15 50,25 T90,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                strokeDasharray="0.5 1"
                className="opacity-30"
              />
              <path
                d="M20,35 Q40,25 60,35 T100,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                strokeDasharray="0.5 1"
                className="opacity-20"
              />
              <path
                d="M30,15 Q50,5 70,15 T110,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                strokeDasharray="0.5 1"
                className="opacity-20"
              />

              <path
                d="M25,18 Q37.5,10 50,25"
                fill="none"
                stroke="url(#goldGradient1)"
                strokeWidth="0.2"
                className="animate-pulse"
              />
              <path
                d="M50,25 Q65,40 80,30"
                fill="none"
                stroke="url(#goldGradient1)"
                strokeWidth="0.2"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              <defs>
                <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-gbn-gold)" />
                  <stop offset="100%" stopColor="var(--color-gbn-gold-light)" />
                </linearGradient>
              </defs>

              <circle cx="25" cy="18" r="0.8" className="text-[#c5a059] fill-current animate-pulse-gold" />
              <circle
                cx="50"
                cy="25"
                r="1.2"
                className="text-[#c5a059] fill-current animate-pulse-gold group-hover:scale-[1.5] transition-transform duration-700"
              />
              <circle cx="80" cy="30" r="0.8" className="text-[#c5a059] fill-current animate-pulse-gold" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center bg-white/90 dark:bg-gbn-navy/50 py-8 px-12 rounded-2xl backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
            <span className="text-slate-900 dark:text-white font-medium text-base lg:text-xl">
              {t.globalNetwork.people}
            </span>
            <span className="hidden md:inline text-[#c5a059]">→</span>
            <span className="text-slate-900 dark:text-white font-medium text-base lg:text-xl">
              {t.globalNetwork.connections}
            </span>
            <span className="hidden md:inline text-[#c5a059]">→</span>
            <span className="text-slate-900 dark:text-white font-medium text-base lg:text-xl">
              {t.globalNetwork.collaboration}
            </span>
            <span className="hidden md:inline text-[#c5a059]">→</span>
            <span className="text-slate-900 dark:text-white font-medium text-base lg:text-xl">
              {t.globalNetwork.growth}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
