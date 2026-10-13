"use client";

import { Video, Coffee, Presentation, Target, Puzzle, Lightbulb, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InsideGBN() {
  const { t } = useLanguage();

  const iconComponents = [
    Video,
    Coffee,
    Presentation,
    Target,
    Puzzle,
    Lightbulb,
  ];

  const experiences = t.insideGbn.experiences.map((exp, idx) => ({
    title: exp.title,
    desc: exp.desc,
    Icon: iconComponents[idx % iconComponents.length],
  }));

  return (
    <section className="py-24 bg-white dark:bg-gbn-navy text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-200/80 dark:border-white/5">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-[#152a55]/25 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase bg-[#c5a059]/10 text-[#a88235] dark:text-[#e6ca85] border border-[#c5a059]/25 mb-6 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>The GBN Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 leading-tight">
            {t.insideGbn.heading}{" "}
            <span className="text-gradient-gold block mt-2">
              {t.insideGbn.headingHighlight}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-gray-300 leading-relaxed text-balance font-normal">
            {t.insideGbn.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {experiences.map((exp, idx) => {
            const IconComponent = exp.Icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0c1426]/80 border border-slate-200/90 dark:border-white/10 p-8 sm:p-9 rounded-3xl hover:bg-white dark:hover:bg-[#111c33] hover:border-[#c5a059]/60 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1.5 shadow-sm hover:shadow-2xl hover:shadow-[#c5a059]/10 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Accent Line on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c5a059]/20 via-[#c5a059]/10 to-transparent border border-[#c5a059]/30 flex items-center justify-center text-[#a88235] dark:text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059]/25 group-hover:border-[#c5a059]/60 group-hover:shadow-lg group-hover:shadow-[#c5a059]/20 transition-all duration-300 shadow-sm">
                      <IconComponent size={26} strokeWidth={1.8} />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#a88235]/70 dark:text-[#c5a059]/60 uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 text-slate-900 dark:text-white group-hover:text-[#c5a059] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-gray-400 font-normal text-xs sm:text-sm leading-relaxed mt-1">
                  {exp.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
