"use client";

import { useEffect, useState } from "react";

export default function GBNJourney() {
    const [activeIndex, setActiveIndex] = useState(0);

    const steps = [
        { title: "MEET", color: "text-blue-500" },
        { title: "CONNECT", color: "text-blue-600" },
        { title: "UNDERSTAND", color: "text-gbn-navy" },
        { title: "COLLABORATE", color: "text-gbn-gold" },
        { title: "GROW", color: "text-green-500" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <section className="py-24 bg-gbn-navy text-white border-t border-white/5 relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 max-w-3xl mx-auto">
                    From Introduction to Opportunity.
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 max-w-5xl mx-auto px-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
                            {/* Step */}
                            <div
                                className={`transition-all duration-500 transform ${activeIndex === idx
                                    ? "scale-110 font-bold " + (step.title === "COLLABORATE" || step.title === "GROW" ? "text-gbn-gold" : "text-white")
                                    : "scale-100 font-medium text-gray-500 opacity-50"
                                    }`}
                            >
                                <span className="text-xl md:text-2xl tracking-[0.2em] uppercase">{step.title}</span>
                            </div>

                            {/* Arrow */}
                            {idx < steps.length - 1 && (
                                <div className="text-gray-700 md:rotate-0 rotate-90 my-2 md:my-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto italic font-serif font-light">
                    &ldquo;Great business relationships are built over time—not in a single handshake.&rdquo;
                </p>
            </div>
        </section>
    );
}
