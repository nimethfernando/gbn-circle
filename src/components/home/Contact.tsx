import { Mail, Phone, Globe } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-24 bg-gbn-navy text-white" id="contact">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-1/2 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                                Contact Us
                            </p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Let's Connect.</h2>
                        <p className="text-lg text-gray-300 font-light mb-10 leading-relaxed max-w-lg">
                            Whether you want to join GBN Circle, attend an event, explore a collaboration or learn more about the community, we'd love to hear from you.
                        </p>

                        <div className="space-y-6 mb-10">
                            <a href="mailto:gbncircle@gmail.com" className="flex items-center group">
                                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white">
                                    <Mail size={18} strokeWidth={1} />
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Email</p>
                                    <p className="font-light text-gray-300 group-hover:text-white transition-colors">gbncircle@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+919783577773" className="flex items-center group">
                                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white">
                                    <Phone size={18} strokeWidth={1} />
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Phone</p>
                                    <p className="font-light text-gray-300 group-hover:text-white transition-colors">+91 9783577773</p>
                                </div>
                            </a>

                            <a href="https://www.gbncircle.com" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white">
                                    <Globe size={18} strokeWidth={1} />
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Website</p>
                                    <p className="font-light text-gray-300 group-hover:text-white transition-colors">www.gbncircle.com</p>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white hover:border-gbn-gold hover:text-gbn-gold transition-colors">
                                <span className="text-[10px]">IN</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white hover:border-gbn-gold hover:text-gbn-gold transition-colors">
                                <span className="text-[10px]">LI</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-gbn-navy-light/40 border border-white/5 p-8 md:p-10 rounded-sm premium-shadow">
                            <h3 className="text-2xl font-serif text-white mb-6">Send us a message</h3>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light" placeholder="john@company.com" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Phone</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light" placeholder="+91 98765 43210" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Company / Business</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light" placeholder="Company Name" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Subject</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light" placeholder="How can we help?" />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light resize-none" placeholder="Your message here..."></textarea>
                                </div>

                                <button type="button" className="w-full bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] tracking-widest uppercase font-bold py-4 rounded-sm transition-all mt-4">
                                    Submit Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
