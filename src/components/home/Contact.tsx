import { Mail, Phone, Globe } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">Let's Connect.</h2>
                        <p className="text-lg text-gbn-text-muted mb-10 leading-relaxed max-w-lg">
                            Whether you want to join GBN Circle, attend an event, explore a collaboration or learn more about the community, we'd love to hear from you.
                        </p>

                        <div className="space-y-6 mb-10">
                            <a href="mailto:gbncircle@gmail.com" className="flex items-center group">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-gbn-gold group-hover:text-white transition-colors text-gbn-navy">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Email</p>
                                    <p className="font-semibold text-gbn-navy">gbncircle@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+919783577773" className="flex items-center group">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-gbn-gold group-hover:text-white transition-colors text-gbn-navy">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                                    <p className="font-semibold text-gbn-navy">+91 9783577773</p>
                                </div>
                            </a>

                            <a href="https://www.gbncircle.com" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-gbn-gold group-hover:text-white transition-colors text-gbn-navy">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Website</p>
                                    <p className="font-semibold text-gbn-navy">www.gbncircle.com</p>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gbn-navy hover:bg-gbn-navy hover:text-white transition-colors">
                                <span>IN</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gbn-navy hover:bg-gbn-navy hover:text-white transition-colors">
                                <span>LI</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-2xl font-bold text-gbn-navy mb-6">Send us a message</h3>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white" placeholder="john@company.com" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white" placeholder="+91 98765 43210" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company / Business</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white" placeholder="Company Name" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white" placeholder="How can we help?" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gbn-gold focus:border-transparent transition-shadow bg-white resize-none" placeholder="Your message here..."></textarea>
                                </div>

                                <button type="button" className="w-full bg-gbn-navy hover:bg-gbn-navy-light text-white font-semibold py-4 rounded-xl transition-colors mt-2">
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
