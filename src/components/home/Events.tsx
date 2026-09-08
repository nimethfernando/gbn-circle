import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Clock, Video } from "lucide-react";

export default function Events() {
    return (
        <section className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Framework Info */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">
                            Meet. Connect. Collaborate.
                        </h2>
                        <p className="text-lg text-gbn-text-muted mb-10 leading-relaxed">
                            GBN Circle creates regular opportunities for members to meet, exchange ideas, build relationships and explore collaboration.
                        </p>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                            <h3 className="text-lg font-bold text-gbn-navy mb-6">Monthly Framework</h3>
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-4">
                                    <div>
                                        <span className="text-sm text-gbn-gold font-bold uppercase tracking-wider mb-1 block">Week 1</span>
                                        <span className="font-semibold text-gbn-navy">GBN Circle Online Connect #1</span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit">Online</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-4">
                                    <div>
                                        <span className="text-sm text-gbn-gold font-bold uppercase tracking-wider mb-1 block">Week 2</span>
                                        <span className="font-semibold text-gbn-navy">GBN Circle Monthly Physical Meet</span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit">Physical</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-4">
                                    <div>
                                        <span className="text-sm text-gbn-gold font-bold uppercase tracking-wider mb-1 block">Week 3</span>
                                        <span className="font-semibold text-gbn-navy">GBN Circle Online Connect #2</span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit">Online</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                    <div>
                                        <span className="text-sm text-gbn-gold font-bold uppercase tracking-wider mb-1 block">Week 4</span>
                                        <span className="font-semibold text-gbn-navy">GBN Elite Executive Morning</span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit">Elite • Physical • Morning</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center bg-gbn-navy hover:bg-gbn-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all"
                        >
                            View All Events <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>

                    {/* Upcoming Event Mockup */}
                    <div className="lg:w-1/2 flex flex-col">
                        <h3 className="text-2xl font-bold text-gbn-navy mb-8 mt-2">What's Happening Next?</h3>

                        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                            <div className="h-48 bg-gbn-navy relative">
                                {/* Fallback image style */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#152A55_1px,transparent_1px),linear-gradient(to_bottom,#152A55_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
                                <div className="absolute top-4 left-4 bg-gbn-gold text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                    GBN Circle
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h4 className="text-2xl font-bold text-gbn-navy mb-4">GBN Circle Online Connect — September</h4>
                                <p className="text-gbn-text-muted mb-6 line-clamp-2">
                                    Join us for our monthly online connect to discover new opportunities, exchange ideas and build relationships with fellow members.
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-3 text-gbn-gold" />
                                        <span>18 September 2026</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-3 text-gbn-gold" />
                                        <span>7:00 PM – 8:15 PM IST</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Video className="w-4 h-4 mr-3 text-gbn-gold" />
                                        <span>Online Connect</span>
                                    </div>
                                </div>

                                <div className="mt-auto grid grid-cols-2 gap-4">
                                    <Link
                                        href="/events/1"
                                        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gbn-navy font-semibold px-4 py-3 rounded-xl transition-colors text-sm"
                                    >
                                        View Event
                                    </Link>
                                    <Link
                                        href="/events/1/register"
                                        className="flex items-center justify-center bg-gbn-navy hover:bg-gbn-navy-light text-white font-semibold px-4 py-3 rounded-xl transition-colors text-sm"
                                    >
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
