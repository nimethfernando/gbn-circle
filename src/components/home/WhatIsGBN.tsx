import { Users, Handshake, Network, Globe } from "lucide-react";

export default function WhatIsGBN() {
    const points = [
        {
            title: "CONNECT",
            description: "Meet ambitious people who believe in meaningful business relationships.",
            icon: <Handshake className="w-5 h-5 text-gbn-gold" />,
        },
        {
            title: "COLLABORATE",
            description: "Exchange ideas, expertise and opportunities with a community that values collaboration.",
            icon: <Users className="w-5 h-5 text-gbn-gold" />,
        },
        {
            title: "GROW",
            description: "Build relationships that create long-term personal and business growth.",
            icon: <Network className="w-5 h-5 text-gbn-gold" />,
        },
        {
            title: "GLOBAL",
            description: "Connect beyond borders and become part of a growing global business community.",
            icon: <Globe className="w-5 h-5 text-gbn-gold" />,
        },
    ];

    return (
        <section className="py-24 bg-gbn-navy relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="max-w-3xl mb-16 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                        <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                            Why Join
                        </p>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        More Than Networking. <br className="hidden md:block" />A Global Business Community.
                    </h2>

                    <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
                        GBN Circle is built around meaningful relationships, trusted connections and opportunities that go beyond a single meeting. We believe the right conversation can open the right door.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-md bg-gbn-navy-light/50 border border-white/5 hover:border-gbn-gold/50 hover:bg-gbn-navy-light transition-all duration-500 group premium-shadow"
                        >
                            <div className="mb-8 p-3 bg-white/5 border border-white/10 rounded-sm inline-block group-hover:bg-gbn-gold/10 transition-colors">
                                {point.icon}
                            </div>
                            <h3 className="text-[11px] tracking-[0.2em] uppercase font-bold text-gbn-gold mb-4">{point.title}</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
