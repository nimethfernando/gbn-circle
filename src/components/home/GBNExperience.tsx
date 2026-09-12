import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

export default function GBNExperience() {
    const circleFeatures = [
        "Online networking",
        "Physical networking",
        "Member presentations",
        "Business introductions",
        "Networking & opportunity exchange",
        "Knowledge sharing",
        "Collaboration opportunities",
        "Global business connections",
    ];

    const eliteFeatures = [
        "Premium morning networking",
        "High-value introductions",
        "Strategic conversations",
        "Focused collaboration",
        "Leadership-level networking",
        "Breakfast included in the experience",
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative border-t border-white/5">
            <Image src="/event-leadership-C1eE1_9Q (1).jpg" alt="Background" fill className="object-cover opacity-10 pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-gbn-navy via-gbn-navy/90 to-gbn-navy pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Choose Your <span className="text-gradient-gold">GBN Experience</span>
                    </h2>
                    <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                        Find the right level of networking for your business. Understanding the difference between our core entrepreneurial network (₹20L+) and exclusive executive council (₹5Cr+).
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* Card 1: GBN Circle */}
                    <div className="bg-gbn-navy-light/40 border border-white/5 rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col premium-shadow group">
                        <div className="mb-8">
                            <h3 className="text-3xl font-serif text-white mb-2">GBN Circle</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-6 border border-white/10 inline-block px-3 py-1">
                                For businesses with ₹20 Lakh+ annual turnover
                            </p>
                            <p className="text-gray-300 font-light leading-relaxed">
                                A structured business networking experience for entrepreneurs, professionals and business leaders.
                            </p>
                        </div>

                        <div className="flex-grow">
                            <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-4">Includes</h4>
                            <ul className="space-y-3 mb-8 text-sm">
                                {circleFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start text-gray-400">
                                        <Check className="w-4 h-4 text-gray-400 mr-3 shrink-0 mt-0.5" />
                                        <span className="font-light">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <Link
                                href="/community"
                                className="w-full inline-flex justify-center items-center bg-transparent border border-white/20 text-white text-[10px] tracking-widest font-bold px-6 py-4 rounded-sm transition-all hover:border-white uppercase"
                            >
                                Explore GBN Circle
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: GBN Elite */}
                    <div className="bg-gradient-to-br from-gbn-gold/10 to-transparent border border-gbn-gold/20 rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col premium-shadow group">

                        <div className="absolute top-0 right-0 w-48 h-48 bg-gbn-gold opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-8 relative z-10">
                            <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-gbn-gold transition-colors">GBN Elite</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gbn-gold mb-6 border border-gbn-gold/30 bg-gbn-gold/10 inline-block px-3 py-1">
                                For businesses with ₹5 Crore+ annual turnover
                            </p>
                            <p className="text-gray-300 font-light leading-relaxed">
                                A premium networking experience for established business leaders seeking focused conversations, strategic relationships and high-value connections.
                            </p>
                        </div>

                        <div className="flex-grow relative z-10">
                            <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-4">Includes</h4>
                            <ul className="space-y-3 mb-8 text-sm">
                                {eliteFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start text-gray-300">
                                        <Check className="w-4 h-4 text-gbn-gold mr-3 shrink-0 mt-0.5" />
                                        <span className="font-light">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gbn-gold/10 relative z-10">
                            <Link
                                href="/community"
                                className="w-full inline-flex justify-center items-center bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] tracking-widest font-bold px-6 py-4 rounded-sm transition-all uppercase"
                            >
                                Explore GBN Elite
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
