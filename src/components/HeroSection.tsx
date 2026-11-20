"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, FileText, Globe2, Award, Shield } from "lucide-react";
import { CONFERENCE } from "@/lib/conference-data";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0C1B33] text-white py-20 md:py-28 dark-grid-pattern border-b border-[#1F355E] overflow-hidden">
      {/* Subtle ambient green glow behind hero */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#92C644]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-[#006699]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Milestone Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#142646] border border-[#1F355E] text-xs font-mono font-medium tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-[#92C644] animate-pulse" />
              <span className="text-[#E2E8F0]">DSpace Jubilee Commemoration</span>
              <span className="text-[#92C644] font-bold">2002–2026</span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                International Conference on the Jubilee Celebration of DSpace
              </h1>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-normal max-w-2xl">
                Commemorating more than twenty years of open-source repository innovation, sovereign institutional preservation, and worldwide open science scholarship under Lyrasis community governance.
              </p>
            </motion.div>

            {/* Key Dates & Venue Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 pt-1 text-xs text-white"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#142646] border border-[#1F355E]">
                <Calendar className="w-4 h-4 text-[#92C644]" />
                <span className="font-semibold">{CONFERENCE.dates}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#142646] border border-[#1F355E]">
                <MapPin className="w-4 h-4 text-[#92C644]" />
                <span className="text-[#E2E8F0]">{CONFERENCE.format}</span>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-[#92C644] hover:bg-[#82B438] text-[#0C1B33] text-sm font-bold px-6 py-3.5 rounded-md transition-all shadow-dspace-sm hover:shadow-dspace-md hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-[#0C1B33]" />
                <span>Submit Your Poster</span>
                <ArrowRight className="w-4 h-4 text-[#0C1B33]" />
              </Link>
              <Link
                href="#poster-guidelines"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#92C644] px-5 py-3.5 rounded-md border border-[#1F355E] bg-[#142646]/80 hover:bg-[#142646] transition-colors"
              >
                <span>Poster Structure &amp; Guidelines</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Hero Graphic / DSpace Jubilee Badge Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#142646]/90 border border-[#1F355E] rounded-xl p-7 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 pb-5 border-b border-[#1F355E]">
                <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
                  <Image
                    src="/dspace-logo.png"
                    alt="DSpace Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#92C644] font-bold uppercase tracking-wider">
                    Jubilee Edition
                  </div>
                  <div className="font-serif font-bold text-lg text-white">
                    20+ Years of DSpace
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    Global Open Access Milestone
                  </div>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="space-y-3.5 pt-5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded bg-[#0C1B33]/60 border border-[#1F355E]">
                  <span className="text-[#94A3B8]">Global Deployments</span>
                  <span className="font-mono font-bold text-[#92C644]">3,000+ Repositories</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-[#0C1B33]/60 border border-[#1F355E]">
                  <span className="text-[#94A3B8]">Worldwide Reach</span>
                  <span className="font-mono font-bold text-white">100+ Countries</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-[#0C1B33]/60 border border-[#1F355E]">
                  <span className="text-[#94A3B8]">Governance</span>
                  <span className="font-mono font-bold text-white">Lyrasis Stewardship</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-[#0C1B33]/60 border border-[#1F355E]">
                  <span className="text-[#94A3B8]">Review Standard</span>
                  <span className="font-mono font-bold text-[#92C644]">Double-Blind Peer Review</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
