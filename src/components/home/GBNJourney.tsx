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
        <section className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-16">
                    From Introduction to Opportunity.
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 max-w-5xl mx-auto overflow-hidden px-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
                            {/* Step */}
                            <div
                                className={`transition-all duration-500 transform ${activeIndex === idx
                                        ? "scale-125 font-bold " + step.color
                                        : "scale-100 font-medium text-gray-400 opacity-50"
                                    }`}
                            >
                                <span className="text-2xl md:text-3xl tracking-widest uppercase">{step.title}</span>
                            </div>

                            {/* Arrow */}
                            {idx < steps.length - 1 && (
                                <div className="text-gray-300 md:rotate-0 rotate-90 my-2 md:my-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-xl md:text-2xl text-gbn-text-muted max-w-3xl mx-auto italic font-light">
                    "Great business relationships are built over time—not in a single handshake."
                </p>
            </div>
        </section>
    );
}
