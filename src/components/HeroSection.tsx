"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, FileText } from "lucide-react";
import { CONFERENCE } from "@/lib/conference-data";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#12201D] text-[#F7F5F0] py-20 md:py-28 dark-grid-pattern border-b border-[#2A3835] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Milestone Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2D2A] border border-[#2A3835] text-[#F7F5F0] text-xs font-mono font-medium tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#A24B27]" />
            <span>Jubilee Commemoration (2002-2026)</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F7F5F0] tracking-tight leading-[1.1]">
              International Conference on the Jubilee Celebration of DSpace
            </h1>
            <p className="text-base sm:text-lg text-[#C8C2B5] leading-relaxed font-normal max-w-2xl">
              Commemorating more than twenty years of open-source repository innovation, institutional digital preservation, and global open access scholarship under Lyrasis community governance.
            </p>
          </motion.div>

          {/* Key Dates & Venue Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 pt-2 text-xs text-[#F7F5F0]"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#1B2D2A] border border-[#2A3835]">
              <Calendar className="w-4 h-4 text-[#A24B27]" />
              <span className="font-semibold">{CONFERENCE.dates}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#1B2D2A] border border-[#2A3835]">
              <MapPin className="w-4 h-4 text-[#A24B27]" />
              <span>{CONFERENCE.format}</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-[#A24B27] hover:bg-[#883C1D] text-[#F7F5F0] text-sm font-semibold px-6 py-3 rounded transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Your Poster</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#poster-guidelines"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F7F5F0] hover:text-[#C8C2B5] px-4 py-3 rounded border border-[#2A3835] bg-[#1B2D2A] hover:bg-[#233834] transition-colors"
            >
              <span>Poster Structure &amp; Guidelines</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
