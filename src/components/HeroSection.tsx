"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { CONFERENCE } from "@/lib/conference-data";

const HERO_BG_IMAGES = [
  { src: "/heroImage/Shodhganga.png", alt: "Shodhganga — INFLIBNET" },
  { src: "/heroImage/egyanKosh.png", alt: "eGyanKosh — IGNOU" },
  { src: "/heroImage/iitdIR.png", alt: "IIT Delhi Institutional Repository" },
  { src: "/heroImage/krishikosh.png", alt: "KrishiKosh — ICAR" },
];

export const HeroSection: React.FC = () => {
  const [activeBg, setActiveBg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) return;
    const timer = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [modalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft") {
        setActiveBg((prev) => (prev - 1 + HERO_BG_IMAGES.length) % HERO_BG_IMAGES.length);
      }
      if (e.key === "ArrowRight") {
        setActiveBg((prev) => (prev + 1) % HERO_BG_IMAGES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveBg((prev) => (prev - 1 + HERO_BG_IMAGES.length) % HERO_BG_IMAGES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveBg((prev) => (prev + 1) % HERO_BG_IMAGES.length);
  };

  return (
    <>
      <section className="relative bg-[#0C1B33] text-white py-8 sm:py-10 md:py-14 lg:py-16 dark-grid-pattern border-b border-[#1F355E] overflow-hidden">
        {/* Desktop Full-height Right-aligned Background Image (clickable to open modal) */}
        <div
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setModalOpen(true);
          }}
          aria-label={`View ${HERO_BG_IMAGES[activeBg].alt} in modal`}
          className="hidden lg:flex absolute inset-0 z-0 select-none overflow-hidden justify-end cursor-pointer group"
        >
          <div className="relative w-[60%] h-full">
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
                  loading="lazy"
                  sizes="60vw"
                  className="object-contain object-right"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle hover expand hint */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0C1B33]/85 text-white text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-[#1F355E] flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#92C644]" />
              <span>Click to expand</span>
            </div>
          </div>
        </div>

        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10 pointer-events-none">
          {/* Mobile / Tablet Image ABOVE text & buttons (clickable to open modal) */}
          <div className="lg:hidden mb-5 pointer-events-auto">
            <div
              onClick={() => setModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setModalOpen(true);
              }}
              aria-label={`View ${HERO_BG_IMAGES[activeBg].alt} in modal`}
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#142646] border border-[#1F355E] shadow-xl cursor-pointer group"
            >
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
                    loading="lazy"
                    sizes="100vw"
                    className="object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-2 right-2 bg-[#0C1B33]/85 text-white text-[10px] font-mono px-2 py-1 rounded border border-[#1F355E] flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-[#92C644]" />
                <span>Tap to view</span>
              </div>
            </div>
          </div>

          {/* Text Block with dark navy grid backdrop */}
          <div className="pointer-events-auto w-full lg:max-w-md xl:max-w-[480px] bg-[#0C1B33]/90 dark-grid-pattern backdrop-blur-md border border-[#1F355E]/80 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
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
          <div className="pointer-events-auto mt-6 pt-3 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[11px] font-mono text-[#CBD5E1] bg-[#0C1B33]/80 hover:bg-[#142646] px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              Featured Repository:{" "}
              <strong className="text-[#92C644]">{HERO_BG_IMAGES[activeBg].alt}</strong>
            </button>

            <div
              className="flex items-center gap-1.5 bg-[#0C1B33]/80 px-2.5 py-1.5 rounded-full"
              aria-label="Background showcase slides"
            >
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

      {/* Lightbox Modal for Clicked Image */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0C1B33] border border-[#1F355E] rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F355E] bg-[#142646]">
                <span className="text-xs sm:text-sm font-serif font-bold text-white">
                  {HERO_BG_IMAGES[activeBg].alt}
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-md text-[#CBD5E1] hover:text-white hover:bg-[#1F355E] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/9] bg-[#0C1B33]">
                <Image
                  src={HERO_BG_IMAGES[activeBg].src}
                  alt={HERO_BG_IMAGES[activeBg].alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  className="object-contain"
                />

                {/* Prev / Next Controls */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0C1B33]/80 border border-[#1F355E] text-white hover:text-[#92C644] hover:border-[#92C644] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0C1B33]/80 border border-[#1F355E] text-white hover:text-[#92C644] hover:border-[#92C644] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
