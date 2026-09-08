import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="py-24 bg-gbn-navy text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gbn-navy via-gbn-navy to-gbn-navy-light z-0"></div>

            {/* Decorative lines/glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gbn-gold rounded-full blur-[150px] opacity-10 pointer-events-none z-0"></div>

            <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    Ready to Expand Your <br className="hidden md:block" /> Business Network?
                </h2>
                <p className="text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto">
                    Join GBN Circle today and become part of a global community built on meaningful relationships, trust and shared growth.
                </p>

                <Link
                    href="/join"
                    className="inline-flex items-center justify-center bg-gbn-gold hover:bg-gbn-gold-hover text-white text-lg font-semibold px-10 py-5 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-gbn-gold/20"
                >
                    Join GBN Circle <ArrowRight size={20} className="ml-2" />
                </Link>
            </div>
        </section>
    );
}
