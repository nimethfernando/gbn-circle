import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Inspiration() {
    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gbn-navy to-gbn-navy"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">
                    Inspired by Connection. Built for the Future.
                </h2>

                <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-12">
                    GBN Circle was inspired by <span className="font-semibold text-white">Ditya Batra</span> and the belief that bringing people together can create opportunities, relationships and possibilities that extend far beyond a single meeting.
                </p>

                <div className="mb-12">
                    <p className="text-lg md:text-xl font-medium text-gbn-gold space-y-2 flex flex-col">
                        <span>Connect people.</span>
                        <span>Create possibilities.</span>
                        <span>Grow together.</span>
                    </p>
                </div>

                <Link
                    href="/about"
                    className="inline-flex items-center text-white font-semibold hover:text-gbn-gold transition-colors text-lg"
                >
                    Discover Our Story <ArrowRight size={20} className="ml-2" />
                </Link>
            </div>
        </section>
    );
}
