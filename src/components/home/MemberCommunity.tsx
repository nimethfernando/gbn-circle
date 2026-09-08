import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MemberCommunity() {
    const categories = [
        "Entrepreneurs",
        "Business Owners",
        "Professionals",
        "Industry Experts",
        "Consultants",
        "Founders",
        "Business Leaders"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6 leading-tight">
                            Meet People. <br /><span className="text-gbn-gold">Discover Possibilities.</span>
                        </h2>
                        <p className="text-lg text-gbn-text-muted mb-6 leading-relaxed">
                            Every member brings something different—experience, expertise, ideas, opportunities and relationships.
                        </p>
                        <p className="text-lg text-gbn-text-muted mb-10 leading-relaxed">
                            GBN Circle brings these strengths together to create an environment where people can connect, collaborate and grow.
                        </p>

                        <Link
                            href="/members"
                            className="inline-flex items-center justify-center bg-gbn-navy hover:bg-gbn-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all"
                        >
                            Explore Members <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {categories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-center text-gbn-navy font-medium hover:border-gbn-gold hover:shadow-md transition-all cursor-default"
                                >
                                    {cat}
                                </div>
                            ))}
                            {/* Decorative extra card to make it look full if needed, or just let it wrap naturally */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
