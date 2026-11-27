import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { NationalRepositoriesSection } from "@/components/NationalRepositoriesSection";
import { PosterGuidelinesSection } from "@/components/PosterGuidelinesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* National Case Studies: Shodhganga & eGyanKosh (India's Largest Repositories on DSpace) */}
      <NationalRepositoriesSection />

      {/* Poster Submission, Structure Details & Submit CTA */}
      <PosterGuidelinesSection />
    </div>
  );
}
