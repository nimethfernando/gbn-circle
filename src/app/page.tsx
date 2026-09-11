import Hero from "@/components/home/Hero";
import WhatIsGBN from "@/components/home/WhatIsGBN";
import WhoIsGBNFor from "@/components/home/WhoIsGBNFor";
import InsideGBN from "@/components/home/InsideGBN";
import ThreePrinciples from "@/components/home/ThreePrinciples";
import GBNExperience from "@/components/home/GBNExperience";
import GlobalNetwork from "@/components/home/GlobalNetwork";
import Events from "@/components/home/Events";
import Leadership from "@/components/home/Leadership";
import Inspiration from "@/components/home/Inspiration";
import MemberCommunity from "@/components/home/MemberCommunity";
import GBNJourney from "@/components/home/GBNJourney";
import FinalCTA from "@/components/home/FinalCTA";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <WhatIsGBN />
      <WhoIsGBNFor />
      <InsideGBN />
      <ThreePrinciples />
      <GBNExperience />
      <GlobalNetwork />
      <Events />
      <Leadership />
      <Inspiration />
      <MemberCommunity />
      <GBNJourney />
      {/* TESTIMONIALS & VERIFIED IMPACT sections omitted for now, as per PRD "hide this section completely if not available" */}
      <FinalCTA />
      <Contact />
    </main>
  );
}
