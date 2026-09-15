import Link from "next/link";
import { HomePageContent } from "@/lib/defaultPageContent";

interface HeroProps {
  data?: HomePageContent['hero'];
}

export default function Hero({ data }: HeroProps = {}) {
  const badge = data?.badge || "Connect • Collaborate • Grow";
  const headingLine1 = data?.headingLine1 || "Connect With Business Leaders.";
  const headingLine2 = data?.headingLine2 || "Grow Together.";
  const subtitle =
    data?.subtitle ||
    "GBN Circle is a global business network for entrepreneurs, professionals and business leaders seeking meaningful connections, collaboration and new opportunities.";
  const primaryBtnText = data?.primaryBtnText || "Join GBN Circle";
  const primaryBtnLink = data?.primaryBtnLink || "/community";
  const secondaryBtnText = data?.secondaryBtnText || "Explore the Community";
  const secondaryBtnLink = data?.secondaryBtnLink || "/community";

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden text-left bg-gbn-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('/vision-wide-Dafp-BMf.jpg')] bg-cover bg-center bg-no-repeat opacity-40 animate-slow-zoom"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gbn-navy-dark via-gbn-navy/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gbn-navy-dark via-transparent to-transparent"></div>

      <div className="container relative mx-auto px-6 md:px-12 z-10 max-w-7xl mt-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
            <div
              className="h-px w-0 bg-gold-gradient animate-draw-line"
              style={{
                animationDelay: '0.2s',
                background:
                  'linear-gradient(to right, transparent, var(--color-gbn-gold))',
              }}
            ></div>
            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
              {badge}
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
            {headingLine1}{' '}
            <br className="hidden md:block" />
            <span className="text-gradient-gold">{headingLine2}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in-up delay-300">
            <Link
              href={primaryBtnLink}
              className="w-full sm:w-auto bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:scale-105 flex items-center justify-center uppercase hover-shine"
            >
              {primaryBtnText}
            </Link>
            <Link
              href={secondaryBtnLink}
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
            >
              {secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
