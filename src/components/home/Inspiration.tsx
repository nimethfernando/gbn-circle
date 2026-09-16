"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Inspiration() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-white dark:via-gbn-navy dark:to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white font-serif">
          {t.inspiration.heading}
        </h2>

        <p className="text-lg md:text-2xl font-normal text-slate-900 dark:text-gray-300 leading-relaxed mb-12">
          {t.inspiration.quote}
        </p>

        <div className="mb-12">
          <p className="text-lg md:text-xl font-medium text-[#a88235] dark:text-gbn-gold space-y-2 flex flex-col">
            <span>{t.inspiration.connect}</span>
            <span>{t.inspiration.create}</span>
            <span>{t.inspiration.grow}</span>
          </p>
        </div>

        <Link
          href="/about"
          className="inline-flex items-center text-slate-900 dark:text-white font-semibold hover:text-[#c5a059] dark:hover:text-gbn-gold transition-colors text-base sm:text-lg"
        >
          {t.inspiration.btn} <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
