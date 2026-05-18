import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Why } from "@/components/sections/Why";
import { RouteMap } from "@/components/sections/RouteMap";
import { Itinerary } from "@/components/sections/Itinerary";
import { Gallery } from "@/components/sections/Gallery";
import { Budget } from "@/components/sections/Budget";
import { Crew } from "@/components/sections/Crew";
import { Weather } from "@/components/sections/Weather";
import { Faq } from "@/components/sections/Faq";
import { Packing } from "@/components/sections/Packing";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Лендинг «Кавказ-2026».
 * Один длинный скролл, секции идут в порядке прокрутки.
 */
export default function Home() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main>
        <Hero />
        <Why />
        <RouteMap />
        <Itinerary />
        <Gallery />
        <Budget />
        <Crew />
        <Weather />
        <Faq />
        <Packing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
