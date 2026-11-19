"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HOW_DSPACE_WORKS } from "@/lib/conference-data";

export const AboutDSpaceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="about-dspace" className="py-20 bg-white border-b border-[#E4DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A24B27]">
            Part 01: Architecture &amp; Community
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#12201D] tracking-tight">
            About DSpace: How It Works &amp; Lyrasis Governance
          </h2>
          <p className="text-sm sm:text-base text-[#5B6865] leading-relaxed">
            Originally created in 2002 by MIT Libraries and Hewlett-Packard (HP) Labs, DSpace is the premier open-source repository platform designed for preserving and providing open access to academic research.
          </p>
        </div>

        {/* 3 Step Interactive Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Step Selector List */}
          <div className="md:col-span-5 space-y-2">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#5B6865] mb-3">
              How Research Flows Through DSpace:
            </div>
            {HOW_DSPACE_WORKS.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? "bg-[#12201D] text-white border-[#12201D] shadow-sm font-semibold"
                      : "bg-[#F7F5F0] text-[#12201D] border-[#E4DFD5] hover:border-[#C8C2B5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#A24B27]">
                      {item.step}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-[#C8C2B5]" : "text-[#5B6865]"}`}>
                    {isSelected ? "Active" : "Inspect"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details */}
          <div className="md:col-span-7 bg-[#F7F5F0] border border-[#E4DFD5] rounded p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A24B27]">
                    Step {HOW_DSPACE_WORKS[activeStep].step}
                  </span>
                  <span className="text-xs font-mono text-[#5B6865]">
                    Open Access Standard
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#12201D]">
                  {HOW_DSPACE_WORKS[activeStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
                  {HOW_DSPACE_WORKS[activeStep].desc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#125740] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Compliant with Dublin Core and OAI-PMH interoperability standards</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Lyrasis Governance Card */}
        <div className="p-6 sm:p-8 rounded bg-[#F7F5F0] border border-[#E4DFD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#A24B27] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Community Stewardship</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#12201D]">
              Governed under the Lyrasis Community Model
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
              DSpace is an open-source software project governed under Lyrasis, a 501(c)(3) non-profit membership organization. Lyrasis provides fiscal sponsorship, transparent community governance, and coordinates international release cycles.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://dspace.lyrasis.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#12201D] hover:bg-[#2A3835] text-white text-xs font-semibold px-4 py-2.5 rounded transition-colors"
            >
              <span>Visit DSpace.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
