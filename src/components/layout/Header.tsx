"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Community", href: "/community" },
        { name: "Leadership", href: "/leadership" },
        { name: "Events", href: "/events" },
        { name: "Members", href: "/members" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex flex-col">
                    <span className={`text-2xl font-bold tracking-tight ${isScrolled ? "text-gbn-navy" : "text-white"}`}>GBN Circle</span>
                    <span className={`text-[10px] tracking-widest uppercase mt-0.5 ${isScrolled ? "text-gbn-gold" : "text-gray-300"}`}>
                        Global Business Network
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-gbn-gold ${isScrolled ? "text-gbn-navy" : "text-gray-100"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/join"
                        className="hidden md:inline-flex bg-gbn-gold hover:bg-gbn-gold-hover text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
                    >
                        Join GBN Circle
                    </Link>
                    <button
                        className={`md:hidden p-2 ${isScrolled ? "text-gbn-navy" : "text-white"}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gbn-navy font-medium text-lg border-b border-gray-100 pb-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/join"
                        className="inline-flex justify-center bg-gbn-gold text-white font-semibold px-6 py-3 rounded-full mt-4"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Join GBN Circle
                    </Link>
                </div>
            )}
        </header>
    );
}
