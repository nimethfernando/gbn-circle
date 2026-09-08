import Link from "next/link";
import { Users, Handshake, Network, TrendingUp } from "lucide-react";

export default function WhatIsGBN() {
    const points = [
        {
            title: "Meet People",
            description: "Connect with entrepreneurs, professionals and business leaders.",
            icon: <Users className="w-8 h-8 text-gbn-gold" />,
        },
        {
            title: "Build Relationships",
            description: "Develop meaningful business relationships over time.",
            icon: <Handshake className="w-8 h-8 text-gbn-gold" />,
        },
        {
            title: "Exchange Opportunities",
            description: "Share referrals, ideas, expertise and business possibilities.",
            icon: <Network className="w-8 h-8 text-gbn-gold" />,
        },
        {
            title: "Collaborate & Grow",
            description: "Turn relationships into collaboration and long-term growth.",
            icon: <TrendingUp className="w-8 h-8 text-gbn-gold" />,
        },
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">
                        A Business Network Built Around Meaningful Relationships.
                    </h2>
                    <p className="text-lg text-gbn-text-muted leading-relaxed">
                        Networking should be more than exchanging business cards. GBN Circle brings entrepreneurs, professionals and business leaders together through structured networking experiences designed to create meaningful relationships, exchange opportunities and encourage collaboration.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gbn-gold/30 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gbn-navy mb-3">{point.title}</h3>
                            <p className="text-gbn-text-muted leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/about"
                        className="inline-flex items-center text-gbn-navy font-semibold hover:text-gbn-gold transition-colors text-lg"
                    >
                        Discover GBN Circle <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
