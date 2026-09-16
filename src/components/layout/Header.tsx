"use client";

import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  showMembers?: boolean;
  showEvents?: boolean;
  showBlogs?: boolean;
  showCommunity?: boolean;
  showLeadership?: boolean;
}

export default function Header({
  showMembers = false,
  showEvents = true,
  showBlogs = true,
  showCommunity = true,
  showLeadership = true,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    ...(showCommunity ? [{ name: t.nav.community, href: "/community" }] : []),
    ...(showLeadership ? [{ name: t.nav.leadership, href: "/leadership" }] : []),
    ...(showEvents ? [{ name: t.nav.events, href: "/events" }] : []),
    ...(showBlogs ? [{ name: t.nav.blogs, href: "/blogs" }] : []),
    ...(showMembers ? [{ name: t.nav.members, href: "/members" }] : []),
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full max-w-[100vw] z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#070b19]/95 text-slate-900 dark:text-white backdrop-blur-md shadow-md dark:shadow-2xl py-3 border-b border-slate-200 dark:border-white/5"
          : "bg-transparent py-5 text-slate-900 dark:text-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 mr-4">
          <Image
            src="/favicon.png"
            alt="GBN Circle Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              GBN Circle
            </span>
            <span className="text-[10px] tracking-widest uppercase mt-0.5 text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
              Global Business Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-widest font-bold uppercase transition-colors pb-1 border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-[#c5a059] text-[#c5a059]"
                    : "border-transparent text-slate-700 dark:text-slate-300 hover:text-[#c5a059]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Pill */}
          <div className="inline-flex items-center bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-full p-0.5 shadow-inner">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-[#c5a059] text-slate-900 dark:text-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ka')}
              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                language === 'ka'
                  ? 'bg-white dark:bg-[#c5a059] text-slate-900 dark:text-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="ქართულზე გადართვა (Switch to Georgian)"
            >
              ქარ
            </button>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.switchToLight : t.theme.switchToDark}
            title={theme === 'dark' ? t.theme.switchToLight : t.theme.switchToDark}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-[#c5a059] dark:hover:text-[#c5a059] transition-all cursor-pointer shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun size={17} className="text-[#f5c344]" />
            ) : (
              <Moon size={17} className="text-slate-700" />
            )}
          </button>

          <Link
            href="/admin/events"
            className="hidden sm:inline-flex border border-slate-300 dark:border-slate-700 hover:border-[#c5a059] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[10px] tracking-widest font-semibold px-3.5 py-2 rounded transition-all uppercase"
          >
            {t.nav.admin}
          </Link>

          <Link
            href="/community"
            className="hidden lg:inline-flex bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-[10px] tracking-widest font-bold px-4 py-2.5 rounded transition-all hover:scale-105 uppercase whitespace-nowrap shadow-md"
          >
            {t.nav.joinGbn}
          </Link>

          <button
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-slate-800 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full max-w-[100vw] bg-white dark:bg-[#070b19] shadow-2xl py-5 px-6 flex flex-col space-y-4 lg:hidden border-t border-slate-200 dark:border-white/10 box-border overflow-hidden">
          {/* Mobile Theme & Language Controls */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <Globe size={13} className="inline mr-1" /> {t.language.switchLanguage}:
              </span>
              <div className="inline-flex items-center bg-slate-200 dark:bg-slate-900 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    language === 'en'
                      ? 'bg-white dark:bg-[#c5a059] text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ka')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    language === 'ka'
                      ? 'bg-white dark:bg-[#c5a059] text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  ქარ
                </button>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} className="text-[#f5c344]" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon size={14} />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm tracking-widest uppercase border-b border-slate-100 dark:border-white/5 pb-2 transition-colors ${
                  isActive ? "text-[#c5a059]" : "text-slate-700 dark:text-slate-300 hover:text-[#c5a059]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/admin/events"
              className="text-center py-2.5 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.adminPortal}
            </Link>
            <Link
              href="/community"
              className="inline-flex justify-center bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-[11px] tracking-widest font-bold px-6 py-3 rounded uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.joinGbn}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
