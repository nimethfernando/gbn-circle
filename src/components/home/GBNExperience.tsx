import Link from "next/link";
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
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-4">
                        Choose Your GBN Experience
                    </h2>
                    <p className="text-lg text-gbn-text-muted">
                        Find the right level of networking for your business.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* Card 1: GBN Circle */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-gbn-navy mb-2">GBN Circle</h3>
                            <p className="text-sm font-semibold text-gbn-navy/60 uppercase tracking-widest mb-6">
                                For businesses with ₹20 Lakh+ annual turnover
                            </p>
                            <p className="text-gbn-text-muted leading-relaxed">
                                A structured business networking experience for entrepreneurs, professionals and business leaders.
                            </p>
                        </div>

                        <div className="flex-grow">
                            <h4 className="font-semibold text-gbn-navy mb-4">Includes</h4>
                            <ul className="space-y-3 mb-8">
                                {circleFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start text-gbn-text-muted">
                                        <Check className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100">
                            <Link
                                href="/community"
                                className="w-full inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gbn-navy font-semibold px-6 py-4 rounded-xl transition-colors"
                            >
                                Explore GBN Circle
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: GBN Elite */}
                    <div className="bg-gbn-navy text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col shadow-xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-gbn-gold opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-8 relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-2">GBN Elite</h3>
                            <p className="text-sm font-semibold text-gbn-gold uppercase tracking-widest mb-6">
                                For businesses with ₹5 Crore+ annual turnover
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                A premium networking experience for established business leaders seeking focused conversations, strategic relationships and high-value connections.
                            </p>
                        </div>

                        <div className="flex-grow relative z-10">
                            <h4 className="font-semibold text-white mb-4">Includes</h4>
                            <ul className="space-y-3 mb-8">
                                {eliteFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start text-gray-300">
                                        <Check className="w-5 h-5 text-gbn-gold mr-3 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                            <Link
                                href="/community"
                                className="w-full inline-flex justify-center items-center bg-gbn-gold hover:bg-gbn-gold-hover text-white font-semibold px-6 py-4 rounded-xl transition-colors"
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
