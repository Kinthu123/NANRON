import Navbar from "@/components/layout/Navbar";
import StickySection from "@/components/sections/StickySection";
import HeroSlideshow from "@/components/sections/HeroSlideshow";
import HeroTitle from "@/components/sections/HeroTitle";
import ParallaxGallery from "@/components/sections/ParallaxGallery";
import TextRevealSection from "@/components/sections/TextRevealSection";
import InfoSection from "@/components/sections/InfoSection";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#b8b0a8]">
        <HeroSlideshow />
        <HeroTitle />
      </section>

      {/* Parallax photo gallery */}
      <ParallaxGallery />

      {/* Text reveal — before collection cards */}
      <TextRevealSection />

      {/* Collection sticky cards */}
      <StickySection />

      {/* Info / About */}
      <InfoSection />
    </>
  );
}
