"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GBNJourney() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const stepTitles = t.journey.steps;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % stepTitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [stepTitles.length]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 max-w-3xl mx-auto">
          {t.journey.heading}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 max-w-5xl mx-auto px-4">
          {stepTitles.map((title, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto"
            >
              {/* Step */}
              <div
                className={`transition-all duration-500 transform ${
                  activeIndex === idx
                    ? "scale-110 font-bold " +
                      (idx >= 3
                        ? "text-[#a88235] dark:text-gbn-gold"
                        : "text-slate-900 dark:text-white")
                    : "scale-100 font-medium text-slate-400 dark:text-gray-500 opacity-50"
                }`}
              >
                <span className="text-xl md:text-2xl tracking-[0.2em] uppercase">
                  {title}
                </span>
              </div>

              {/* Arrow */}
              {idx < stepTitles.length - 1 && (
                <div className="text-slate-300 dark:text-gray-700 md:rotate-0 rotate-90 my-2 md:my-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-lg md:text-2xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto italic font-serif font-light">
          &ldquo;{t.journey.quote}&rdquo;
        </p>
      </div>
    </section>
  );
}
