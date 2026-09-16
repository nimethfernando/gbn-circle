"use client";

import { Video, Coffee, Presentation, Target, Puzzle, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InsideGBN() {
  const { t } = useLanguage();

  const icons = [
    <Video key="1" size={30} strokeWidth={1.5} />,
    <Coffee key="2" size={30} strokeWidth={1.5} />,
    <Presentation key="3" size={30} strokeWidth={1.5} />,
    <Target key="4" size={30} strokeWidth={1.5} />,
    <Puzzle key="5" size={30} strokeWidth={1.5} />,
    <Lightbulb key="6" size={30} strokeWidth={1.5} />,
  ];

  const experiences = t.insideGbn.experiences.map((exp, idx) => ({
    title: exp.title,
    desc: exp.desc,
    icon: icons[idx % icons.length],
  }));

  return (
    <section className="py-24 bg-white dark:bg-gbn-navy text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-gbn-navy-light opacity-50 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            {t.insideGbn.heading}{" "}
            <span className="text-gradient-gold block mt-2">
              {t.insideGbn.headingHighlight}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-900 dark:text-gray-300 leading-relaxed text-balance font-normal">
            {t.insideGbn.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-2xl hover:bg-white dark:hover:bg-white/10 hover:border-[#c5a059]/40 transition-all duration-500 backdrop-blur-md group hover:-translate-y-1 shadow-sm dark:shadow-none"
            >
              <div className="text-[#a88235] dark:text-gbn-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {exp.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 text-slate-900 dark:text-white group-hover:text-[#c5a059] dark:group-hover:text-gbn-gold transition-colors">
                {exp.title}
              </h3>
              <p className="text-slate-800 dark:text-gray-400 font-normal text-sm leading-relaxed">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
