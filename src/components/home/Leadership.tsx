"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export interface LeaderItem {
    name: string;
    role: string;
    image: string;
    statement?: string;
}

export interface LeadershipSectionData {
    badge?: string;
    heading?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
}

interface LeadershipProps {
    data?: LeadershipSectionData;
    leaders?: LeaderItem[];
}

const defaultLeaders: LeaderItem[] = [
    {
        name: "Amit Batra",
        role: "Founder",
        image: "/event-leadership-C1eE1_9Q.jpg",
    },
    {
        name: "Asha Bhasin",
        role: "Co-Founder",
        image: "/event-leadership-C1eE1_9Q (1).jpg",
    },
    {
        name: "Ditya Batra",
        role: "Chief Inspiration Officer",
        image: "/vision-wide-Dafp-BMf.jpg",
    },
];

export default function Leadership({ data, leaders: propLeaders }: LeadershipProps) {
    const { t, language } = useLanguage();
    const isGeorgian = language === 'ka';

    const leadersList = (propLeaders && propLeaders.length > 0 ? propLeaders : defaultLeaders).map((leader, idx) => ({
        name: leader.name || defaultLeaders[idx]?.name || "Leader",
        role: leader.role || defaultLeaders[idx]?.role || "Executive",
        image: leader.image || defaultLeaders[idx]?.image || "/vision-wide-Dafp-BMf.jpg",
    }));

    const gridColsClass =
        leadersList.length === 1
            ? "grid-cols-1 max-w-sm mx-auto"
            : leadersList.length === 2
            ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
            : leadersList.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    const badge = isGeorgian ? t.leadership.badge : (data?.badge || t.leadership.badge);
    const rawHeading = isGeorgian
        ? `${t.leadership.heading} ${t.leadership.headingGold}`
        : (data?.heading || "Meet the Leadership Behind GBN Circle");
    const description = isGeorgian
        ? t.leadership.desc
        : (data?.description || t.leadership.desc);
    const btnText = isGeorgian ? t.leadership.btn : (data?.btnText || t.leadership.btn);
    const btnLink = data?.btnLink || "/leadership";

    let headingPart1 = rawHeading;
    let headingPart2 = "";
    if (isGeorgian) {
        headingPart1 = t.leadership.heading;
        headingPart2 = t.leadership.headingGold;
    } else if (rawHeading.includes("Behind GBN Circle")) {
        const parts = rawHeading.split("Behind GBN Circle");
        headingPart1 = parts[0].trim();
        headingPart2 = "Behind GBN Circle";
    }

    return (
        <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-[#c5a059] rounded-full"></div>
                        <p className="text-[#a88235] dark:text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                            {badge}
                        </p>
                        <div className="h-px w-8 bg-[#c5a059] rounded-full"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
                        {headingPart1}
                        {headingPart2 ? (
                            <span className="text-gradient-gold block mt-2">{headingPart2}</span>
                        ) : null}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-900 dark:text-gray-300 font-normal leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className={`grid ${gridColsClass} gap-8 mb-16`}>
                    {leadersList.map((leader, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="w-full aspect-[4/5] rounded-sm border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none mb-6 relative overflow-hidden bg-slate-200 dark:bg-[#070b19]">
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    unoptimized={leader.image?.startsWith('data:') || leader.image?.startsWith('http')}
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 dark:bg-gbn-navy/30 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>
                            <h3 className="text-xl font-serif text-slate-900 dark:text-white group-hover:text-[#c5a059] dark:group-hover:text-gbn-gold transition-colors mb-1 font-semibold">
                                {leader.name}
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-[#a88235] dark:text-gbn-gold font-medium">
                                {leader.role}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href={btnLink}
                        className="inline-block bg-white dark:bg-transparent border border-slate-300 dark:border-white/20 text-slate-950 dark:text-white text-xs tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-[#c5a059] dark:hover:border-gbn-gold hover:text-[#c5a059] dark:hover:text-gbn-gold uppercase shadow-sm dark:shadow-none"
                    >
                        {btnText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
