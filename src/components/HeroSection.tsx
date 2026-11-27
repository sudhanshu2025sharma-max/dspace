"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, FileText } from "lucide-react";
import { CONFERENCE } from "@/lib/conference-data";

const HERO_BG_IMAGES = [
  { src: "/heroImage/Shodhganga.png", alt: "Shodhganga — INFLIBNET" },
  { src: "/heroImage/egyanKosh.png", alt: "eGyanKosh — IGNOU" },
  { src: "/heroImage/iitdIR.png", alt: "IIT Delhi Institutional Repository" },
  { src: "/heroImage/krishikosh.png", alt: "KrishiKosh — ICAR" },
];

export const HeroSection: React.FC = () => {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0C1B33] text-white py-12 md:py-16 dark-grid-pattern border-b border-[#1F355E] overflow-hidden">
      {/* Full-height Right-aligned Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex justify-end">
        <div className="relative w-full lg:w-[60%] h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={HERO_BG_IMAGES[activeBg].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_BG_IMAGES[activeBg].src}
                alt={HERO_BG_IMAGES[activeBg].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-right opacity-30 sm:opacity-50 lg:opacity-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Foreground Content: balanced margin, compact width so it stays clear of the image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Text Block with dark navy grid backdrop */}
        <div className="w-full max-w-md xl:max-w-[480px] bg-[#0C1B33]/90 dark-grid-pattern backdrop-blur-md border border-[#1F355E]/80 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
          {/* Milestone Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142646] border border-[#1F355E] text-[11px] font-mono font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[#92C644] animate-pulse" />
            <span className="text-[#E2E8F0]">DSpace Silver Jubilee</span>
            <span className="text-[#92C644] font-bold">IIIC 2026, IGNOU</span>
          </motion.div>

          {/* Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="space-y-2.5"
          >
            <h1 className="text-2xl sm:text-3xl xl:text-[34px] font-serif font-bold text-white tracking-tight leading-[1.18]">
              Celebration of Silver Jubilee of DSpace in IIIC 2026, IGNOU
            </h1>
            <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed font-normal">
              Celebrating open-source repository innovation, institutional digital preservation, and open access scholarship under Lyrasis community governance.
            </p>
          </motion.div>

          {/* Key Date & Venue Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="flex flex-wrap gap-2 text-[11px] text-white"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#142646] border border-[#1F355E]">
              <Calendar className="w-3.5 h-3.5 text-[#92C644]" />
              <span className="font-semibold">{CONFERENCE.dates}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#142646] border border-[#1F355E]">
              <MapPin className="w-3.5 h-3.5 text-[#92C644]" />
              <span className="text-[#E2E8F0]">{CONFERENCE.format}</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-wrap items-center gap-2.5 pt-1"
          >
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-[#92C644] hover:bg-[#82B438] text-[#0C1B33] text-xs font-bold px-4 py-2.5 rounded-md transition-all shadow-dspace-sm hover:shadow-dspace-md"
            >
              <FileText className="w-3.5 h-3.5 text-[#0C1B33]" />
              <span>Submit Your Poster</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0C1B33]" />
            </Link>
            <Link
              href="#poster-guidelines"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#92C644] px-3.5 py-2.5 rounded-md border border-[#1F355E] bg-[#142646]/90 hover:bg-[#142646] transition-colors"
            >
              <span>Poster Guidelines</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar: Featured Repository label & slide dots */}
        <div className="mt-6 pt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-[#CBD5E1] bg-[#0C1B33]/80 px-2.5 py-1 rounded">
            Featured Repository:{" "}
            <strong className="text-[#92C644]">{HERO_BG_IMAGES[activeBg].alt}</strong>
          </span>

          <div className="flex items-center gap-1.5 bg-[#0C1B33]/80 px-2.5 py-1.5 rounded-full" aria-label="Background showcase slides">
            {HERO_BG_IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveBg(idx)}
                aria-label={`Show ${img.alt}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeBg === idx
                    ? "w-6 bg-[#92C644]"
                    : "w-2 bg-[#475569] hover:bg-[#94A3B8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
