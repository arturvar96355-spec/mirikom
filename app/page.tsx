import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { BrandBand } from "@/components/sections/BrandBand";
import { SeriesPicker } from "@/components/sections/SeriesPicker";
import { Symptoms } from "@/components/sections/Symptoms";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ServicesPrices } from "@/components/sections/ServicesPrices";
import { Why } from "@/components/sections/Why";
import { People } from "@/components/sections/People";
import { AlsoServe } from "@/components/sections/AlsoServe";
import { Reviews } from "@/components/sections/Reviews";
import { HowToFind } from "@/components/sections/HowToFind";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { MobileBar } from "@/components/sections/MobileBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <BrandBand />
        <SeriesPicker />
        <Symptoms />
        <HowWeWork />
        <ServicesPrices />
        <Why />
        <People />
        <AlsoServe />
        <Reviews />
        <HowToFind />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
