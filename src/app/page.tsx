import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutDSpaceSection } from "@/components/AboutDSpaceSection";
import { NationalRepositoriesSection } from "@/components/NationalRepositoriesSection";
import { AboutConferenceSection } from "@/components/AboutConferenceSection";
import { PosterGuidelinesSection } from "@/components/PosterGuidelinesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Part 1: About DSpace, How It Works, Community & Lyrasis */}
      <AboutDSpaceSection />

      {/* National Case Studies: Shodhganga & eGyanKosh (India's Largest Repositories on DSpace) */}
      <NationalRepositoriesSection />

      {/* Part 2: The Conference, Occasion & Organizers */}
      <AboutConferenceSection />

      {/* Part 3: Poster Submission, Structure Details & Submit CTA */}
      <PosterGuidelinesSection />
    </div>
  );
}
