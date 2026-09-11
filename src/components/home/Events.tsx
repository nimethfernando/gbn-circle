import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";

export default function Events() {
    const events = [
        {
            category: "GLOBAL CONNECT",
            title: "Global Connect Evening",
            date: "18 September 2026",
            location: "Dubai, United Arab Emirates",
            desc: "An evening of curated introductions between members from four continents, hosted in an intimate executive setting.",
            image: "/event-global-CKOLaEg2 (1).jpg",
        },
        {
            category: "LEADERSHIP",
            title: "Leadership Roundtable",
            date: "02 October 2026",
            location: "London, United Kingdom",
            desc: "A closed-door roundtable where founders and senior leaders discuss the decisions that shaped their growth.",
            image: "/event-leadership-C1eE1_9Q (1).jpg",
        },
        {
            category: "MASTERCLASSES",
            title: "Masterclass: Relationship Capital",
            date: "21 October 2026",
            location: "Online — Global",
            desc: "A practical masterclass on turning a professional network into durable, compounding business value.",
            image: "/event-networking-BdmXOEy2 (1).jpg",
        }
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-3xl animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                                Events
                            </p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">
                            Where Conversations Come to Life.
                        </h2>
                    </div>
                    <Link
                        href="/events"
                        className="inline-flex bg-transparent border border-white/20 text-white text-xs tracking-widest font-bold px-6 py-3 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                    >
                        All Events
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {events.map((evt, idx) => (
                        <div key={idx} className="bg-gbn-navy-light/60 border border-white/5 rounded-sm overflow-hidden group premium-shadow">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image src={evt.image} alt={evt.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-gbn-navy border border-gbn-gold text-gbn-gold text-[10px] tracking-widest px-3 py-1 font-bold uppercase backdrop-blur-md">
                                    {evt.category}
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-white mb-6">{evt.title}</h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                                        <Calendar size={14} className="mr-2 text-gbn-gold" /> {evt.date}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                                        <MapPin size={14} className="mr-2 text-gbn-gold" /> {evt.location}
                                    </div>
                                </div>

                                <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                                    {evt.desc}
                                </p>

                                <div className="flex gap-4">
                                    <Link href="/events" className="flex-1 text-center bg-transparent border border-white/20 hover:border-white text-white text-[10px] font-bold tracking-widest uppercase py-3 transition-colors">
                                        View Event
                                    </Link>
                                    <Link href="/events" className="flex-1 text-center bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] font-bold tracking-widest uppercase py-3 transition-colors">
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
