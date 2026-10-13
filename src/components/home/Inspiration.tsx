"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Users, Sparkles, TrendingUp, Quote, HeartHandshake, Compass, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HomePageContent } from "@/lib/defaultPageContent";

interface InspirationProps {
  data?: HomePageContent['inspiration'];
}

export default function Inspiration({ data }: InspirationProps = {}) {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  // Active step controller for automatic synchronized pillar animation
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through the 3 pillars every 3.8 seconds unless paused by user interaction
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Section fields with internationalization & CMS data fallback
  const badge = isGeorgian ? t.inspiration.badge : (data?.badge || t.inspiration.badge || "The Philosophy");
  const rawHeading = isGeorgian ? t.inspiration.heading : (data?.heading || t.inspiration.heading);
  const quote = isGeorgian ? t.inspiration.quote : (data?.quote || t.inspiration.quote);
  const btnText = isGeorgian ? t.inspiration.btn : (data?.btnText || t.inspiration.btn);
  const btnLink = data?.btnLink || "/about";

  // Three Pillars data
  const connectTitle = isGeorgian ? t.inspiration.connect : (data?.connectTitle || t.inspiration.connect);
  const connectDesc = isGeorgian
    ? t.inspiration.connectDesc
    : (data?.connectDesc || t.inspiration.connectDesc);

  const createTitle = isGeorgian ? t.inspiration.create : (data?.createTitle || t.inspiration.create);
  const createDesc = isGeorgian
    ? t.inspiration.createDesc
    : (data?.createDesc || t.inspiration.createDesc);

  const growTitle = isGeorgian ? t.inspiration.grow : (data?.growTitle || t.inspiration.grow);
  const growDesc = isGeorgian
    ? t.inspiration.growDesc
    : (data?.growDesc || t.inspiration.growDesc);

  // Split heading into two parts for two-tone typography
  const splitHeading = () => {
    if (rawHeading.includes(".")) {
      const parts = rawHeading.split(".");
      return {
        main: parts[0] + ".",
        accent: parts.slice(1).join(".").trim(),
      };
    }
    return {
      main: rawHeading,
      accent: "",
    };
  };

  const headingParts = splitHeading();

  const pillars = [
    {
      id: 0,
      num: "01",
      tag: isGeorgian ? "01 • კავშირი" : "01 • Relationships",
      title: connectTitle,
      desc: connectDesc,
      feature: isGeorgian ? "ნამდვილი ურთიერთობები" : "Curated Introductions",
      metric: isGeorgian ? "გლობალური ჰაბი" : "Global Network",
    },
    {
      id: 1,
      num: "02",
      tag: isGeorgian ? "02 • სინერგია" : "02 • Opportunity",
      title: createTitle,
      desc: createDesc,
      feature: isGeorgian ? "საერთო შესაძლებლობები" : "Collaborative Ventures",
      metric: isGeorgian ? "სტრატეგიული პარტნიორობა" : "Limitless Potential",
    },
    {
      id: 2,
      num: "03",
      tag: isGeorgian ? "03 • განვითარება" : "03 • Longevity",
      title: growTitle,
      desc: growDesc,
      feature: isGeorgian ? "გრძელვადიანი ზრდა" : "Enduring Business Value",
      metric: isGeorgian ? "მუდმივი პროგრესი" : "Compounded Growth",
    },
  ];

  return (
    <section className="py-24 sm:py-32 md:py-36 bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-[#060a17] dark:via-gbn-navy dark:to-[#060a17] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* 1. Ambient Floating Particles & Golden Flares */}
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-[#c5a059]/20 via-[#c5a059]/5 to-transparent blur-[140px] rounded-full pointer-events-none animate-pulse-glow"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-blue-500/5 dark:bg-[#152a55]/25 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Floating Golden Micro-Orbs in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 dark:opacity-80">
        <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#c5a059]/40 blur-xs animate-float-slow"></div>
        <div className="absolute top-[35%] right-[14%] w-3 h-3 rounded-full bg-[#c5a059]/30 blur-xs animate-float-slow [animation-delay:1.5s]"></div>
        <div className="absolute bottom-[28%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#e6ca85]/40 blur-xs animate-float-slow [animation-delay:3s]"></div>
        <div className="absolute bottom-[20%] right-[22%] w-2 h-2 rounded-full bg-[#c5a059]/50 blur-xs animate-float-slow [animation-delay:2.2s]"></div>
      </div>

      {/* Decorative Rotating Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] md:w-[850px] md:h-[850px] rounded-full border border-[#c5a059]/5 dark:border-[#c5a059]/10 pointer-events-none animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1150px] md:h-[1150px] rounded-full border border-dashed border-[#c5a059]/[0.04] dark:border-[#c5a059]/[0.06] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center">
        
        {/* Eyebrow Badge with Gentle Shimmer */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase bg-[#c5a059]/10 text-[#a88235] dark:text-[#e6ca85] border border-[#c5a059]/25 mb-8 shadow-xs backdrop-blur-sm group hover:border-[#c5a059]/50 transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Heading with Gold Gradient Highlights */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-10 max-w-4xl mx-auto">
          {headingParts.main}{" "}
          {headingParts.accent && (
            <span className="text-gradient-gold block sm:inline mt-1 sm:mt-0 font-medium">
              {headingParts.accent}
            </span>
          )}
        </h2>

        {/* Executive Quote Presentation with Floating Medallion */}
        <div className="relative max-w-3xl mx-auto mb-20 p-8 sm:p-12 pt-10 sm:pt-14 rounded-3xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/50 group hover:border-[#c5a059]/40 transition-all duration-500">
          {/* Subtle Shimmer Sweep on Quote Card (confined within card boundaries) */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Floating Medallion - centered on top border, fully visible without clipping */}
          <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#f3e7c4] via-[#c5a059] to-[#977328] text-slate-950 flex items-center justify-center shadow-xl shadow-[#c5a059]/40 border-4 border-white dark:border-[#070b19] transition-transform duration-300 group-hover:scale-105">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-slate-950" />
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-serif font-light text-slate-800 dark:text-slate-200 leading-relaxed italic text-balance mb-6 pt-1">
            &ldquo;{quote}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#a88235] dark:text-[#c5a059]">
            <span className="w-8 h-px bg-[#c5a059]/40"></span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#c5a059]" />
              {isGeorgian ? "დიტია ბატრა • GBN-ის შთაგონება" : "Ditya Batra • GBN Inspiration"}
            </span>
            <span className="w-8 h-px bg-[#c5a059]/40"></span>
          </div>
        </div>

        {/* 2. THE THREE ANIMATED INTERACTIVE PILLAR CARDS */}
        <div
          className="relative mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Desktop Dynamic Connecting Beam Line */}
          <div className="hidden md:block absolute top-[90px] left-[15%] right-[15%] h-px bg-slate-200 dark:bg-white/10 z-0 pointer-events-none">
            {/* Animated Traveling Energy Photon Bead */}
            <div
              className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent shadow-lg shadow-[#c5a059] transition-all duration-700 ease-out"
              style={{
                transform: `translateX(${activeStep === 0 ? '0%' : activeStep === 1 ? '200%' : '400%'}) translateY(-1.5px)`
              }}
            ></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {pillars.map((pillar) => {
              const isActive = activeStep === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActiveStep(pillar.id)}
                  className={`p-8 sm:p-9 rounded-3xl transition-all duration-500 cursor-pointer text-center flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-xl group select-none ${
                    isActive
                      ? "bg-white dark:bg-[#0c1426] border-2 border-[#c5a059] shadow-2xl shadow-[#c5a059]/20 -translate-y-3"
                      : "bg-white/80 dark:bg-[#0a1020]/80 border border-slate-200/90 dark:border-white/10 hover:border-[#c5a059]/50 hover:-translate-y-1.5 shadow-lg dark:shadow-xl dark:shadow-black/40"
                  }`}
                >
                  {/* Top Active Gold Shimmer Line */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  ></div>

                  {/* Subtle Inner Ambient Glow on Active Card */}
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#c5a059]/15 blur-2xl rounded-full pointer-events-none"></div>
                  )}

                  <div className="w-full flex flex-col items-center">
                    
                    {/* BESPOKE ANIMATION FOR EACH PILLAR */}
                    <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                      
                      {/* ------------------- PILLAR 1: CONNECT PEOPLE ------------------- */}
                      {pillar.id === 0 && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Pulsing Concentric Radar Rings */}
                          <div className={`absolute inset-0 rounded-full border border-[#c5a059]/30 ${isActive ? 'animate-radar-pulse' : 'opacity-20'}`}></div>
                          <div className={`absolute inset-3 rounded-full border border-[#c5a059]/40 ${isActive ? 'animate-radar-pulse [animation-delay:1.2s]' : 'opacity-20'}`}></div>

                          {/* Network Constellation Nodes (Orbital dots) */}
                          <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-[#c5a059] flex items-center justify-center shadow-xs shadow-[#c5a059] animate-float-slow">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          </div>
                          <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#e6ca85] flex items-center justify-center shadow-xs shadow-[#c5a059] animate-float-slow [animation-delay:1.5s]">
                            <span className="w-1 h-1 rounded-full bg-white"></span>
                          </div>
                          <div className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-[#c5a059] shadow-xs shadow-[#c5a059] animate-float-slow [animation-delay:2s]"></div>
                          <div className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-[#d4af37] shadow-xs shadow-[#c5a059] animate-float-slow [animation-delay:0.7s]"></div>

                          {/* Connecting SVG Beams */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 112 112">
                            <line x1="20" y1="20" x2="56" y2="56" stroke="#c5a059" strokeWidth="1.5" strokeOpacity="0.4" className={isActive ? "animate-beam-flow" : ""} />
                            <line x1="92" y1="24" x2="56" y2="56" stroke="#c5a059" strokeWidth="1.5" strokeOpacity="0.4" className={isActive ? "animate-beam-flow" : ""} />
                            <line x1="26" y1="92" x2="56" y2="56" stroke="#c5a059" strokeWidth="1.5" strokeOpacity="0.4" className={isActive ? "animate-beam-flow" : ""} />
                            <line x1="88" y1="90" x2="56" y2="56" stroke="#c5a059" strokeWidth="1.5" strokeOpacity="0.4" className={isActive ? "animate-beam-flow" : ""} />
                          </svg>

                          {/* Central Avatar/Hub Node */}
                          <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-[#d4af37] to-[#b38838] text-slate-950 scale-110 shadow-[#c5a059]/40"
                              : "bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 group-hover:scale-105"
                          }`}>
                            <Users className="w-7 h-7" />
                          </div>
                        </div>
                      )}

                      {/* ------------------- PILLAR 2: CREATE POSSIBILITIES ------------------- */}
                      {pillar.id === 1 && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Rotating 8-Point Geometric Opportunity Spark */}
                          <div className={`absolute inset-1 rounded-full border border-dashed border-[#c5a059]/30 ${isActive ? 'animate-spin-slow' : 'opacity-20'}`}></div>

                          {/* Orbiting Sparkle Stars */}
                          <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 text-[#c5a059] ${isActive ? 'animate-pulse' : 'opacity-40'}`}>
                            ✦
                          </div>
                          <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 text-[#e6ca85] ${isActive ? 'animate-pulse [animation-delay:1s]' : 'opacity-40'}`}>
                            ✦
                          </div>
                          <div className={`absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#c5a059] ${isActive ? 'animate-pulse [animation-delay:1.5s]' : 'opacity-40'}`}>
                            ✦
                          </div>
                          <div className={`absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#d4af37] ${isActive ? 'animate-pulse [animation-delay:0.5s]' : 'opacity-40'}`}>
                            ✦
                          </div>

                          {/* Pulsing Light Burst Halo */}
                          <div className={`absolute inset-4 rounded-full bg-gradient-to-r from-[#c5a059]/20 via-[#e6ca85]/30 to-[#c5a059]/20 blur-md ${isActive ? 'animate-pulse-glow' : 'opacity-0'}`}></div>

                          {/* Central Sparkles Prism */}
                          <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-[#d4af37] to-[#b38838] text-slate-950 scale-110 shadow-[#c5a059]/40"
                              : "bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 group-hover:scale-105"
                          }`}>
                            <Sparkles className="w-7 h-7" />
                          </div>
                        </div>
                      )}

                      {/* ------------------- PILLAR 3: GROW TOGETHER ------------------- */}
                      {pillar.id === 2 && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Animated Growth Bars (Ascending momentum equalizer) */}
                          <div className="absolute inset-x-2 bottom-2 flex items-end justify-between px-3 h-16 pointer-events-none opacity-40 dark:opacity-60">
                            <div className={`w-2.5 rounded-t-sm bg-gradient-to-t from-[#c5a059]/30 to-[#c5a059] transition-all duration-700 ${isActive ? 'h-8 animate-pulse' : 'h-4'}`}></div>
                            <div className={`w-2.5 rounded-t-sm bg-gradient-to-t from-[#c5a059]/30 to-[#c5a059] transition-all duration-700 ${isActive ? 'h-11 animate-pulse [animation-delay:0.3s]' : 'h-6'}`}></div>
                            <div className={`w-2.5 rounded-t-sm bg-gradient-to-t from-[#c5a059]/30 to-[#c5a059] transition-all duration-700 ${isActive ? 'h-14 animate-pulse [animation-delay:0.6s]' : 'h-8'}`}></div>
                            <div className={`w-2.5 rounded-t-sm bg-gradient-to-t from-[#c5a059]/30 to-[#e6ca85] transition-all duration-700 ${isActive ? 'h-16 animate-pulse [animation-delay:0.9s]' : 'h-11'}`}></div>
                          </div>

                          {/* Ascending Trend Wave Line (SVG Curve) */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 112 112">
                            <path
                              d="M 16 90 Q 50 70, 70 45 T 100 20"
                              fill="none"
                              stroke="#c5a059"
                              strokeWidth="2"
                              strokeOpacity={isActive ? "0.85" : "0.3"}
                              className={isActive ? "animate-draw-line" : ""}
                            />
                            {/* Glowing Target Peak Node */}
                            <circle cx="100" cy="20" r="3.5" fill="#e6ca85" className={isActive ? "animate-ping" : ""} />
                            <circle cx="100" cy="20" r="2.5" fill="#c5a059" />
                          </svg>

                          {/* Central Growth Icon */}
                          <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-[#d4af37] to-[#b38838] text-slate-950 scale-110 shadow-[#c5a059]/40"
                              : "bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 group-hover:scale-105"
                          }`}>
                            <TrendingUp className="w-7 h-7" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step / Pillar Eyebrow Tag */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                        isActive ? "text-[#c5a059] dark:text-[#e6ca85]" : "text-slate-400 dark:text-slate-500"
                      }`}>
                        {pillar.tag}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping"></span>
                      )}
                    </div>

                    {/* Main Pillar Action Title */}
                    <h3 className={`text-xl sm:text-2xl font-serif font-bold mb-3 transition-colors duration-300 ${
                      isActive ? "text-[#c5a059] dark:text-[#e6ca85]" : "text-slate-900 dark:text-white group-hover:text-[#c5a059]"
                    }`}>
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Feature Accent & Active Timer Bar */}
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 w-full flex flex-col items-center">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                      isActive ? "text-[#c5a059] font-bold" : "text-slate-400 dark:text-slate-500"
                    }`}>
                      {pillar.feature} &bull; {pillar.metric}
                    </span>

                    {/* Animated Progress Bar when this card is currently active */}
                    <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mt-3">
                      <div
                        className={`h-full bg-gradient-to-r from-[#b38838] to-[#c5a059] rounded-full transition-all duration-300 ${
                          isActive ? "w-full animate-[shimmerTravel_3.8s_linear_infinite]" : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Step Switcher Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveStep(p.id)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeStep === p.id
                    ? "w-8 h-2 bg-[#c5a059]"
                    : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#c5a059]/60"
                }`}
                aria-label={`Switch to pillar ${p.num}`}
              />
            ))}
          </div>
        </div>

        {/* 3. Magnetic Luxury Executive Button with Animated Glow */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative group">
            {/* Ambient Pulse Glow Ring behind button */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#b38838] via-[#c5a059] to-[#d4af37] opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-500 animate-pulse-gold"></div>

            <Link
              href={btnLink}
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#b38838] via-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-[#c5a059]/30 hover:shadow-2xl hover:shadow-[#c5a059]/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <span>{btnText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {isGeorgian
              ? "გაეცანით ჩვენს ხედვას, ხელმძღვანელობასა და საერთაშორისო საზოგადოებას"
              : "Explore our founding vision, community leadership & global network"}
          </span>
        </div>

      </div>
    </section>
  );
}
