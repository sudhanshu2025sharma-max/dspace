"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck, CheckCircle2, Layers } from "lucide-react";
import { HOW_DSPACE_WORKS } from "@/lib/conference-data";

export const AboutDSpaceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="about-dspace" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#6F9E2B] bg-[#F2F9E8] px-2.5 py-1 rounded border border-[#E5F4CE]">
            <Layers className="w-3.5 h-3.5" />
            <span>Part 01: Architecture &amp; Community</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0C1B33] tracking-tight">
            About DSpace: How It Works &amp; Lyrasis Governance
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Originally created in 2002 by MIT Libraries and Hewlett-Packard (HP) Labs, DSpace is the premier open-source repository platform designed for preserving and providing open access to academic research worldwide.
          </p>
        </div>

        {/* 3 Step Interactive Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Step Selector List */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-3">
              How Research Flows Through DSpace:
            </div>
            {HOW_DSPACE_WORKS.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0C1B33] text-white border-[#0C1B33] shadow-md font-semibold"
                      : "bg-[#F8FAF8] text-[#0C1B33] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-[#92C644] text-[#0C1B33]"
                          : "bg-[#F2F9E8] text-[#6F9E2B]"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono ${
                      isSelected ? "text-[#92C644]" : "text-[#64748B]"
                    }`}
                  >
                    {isSelected ? "Active View" : "Inspect"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details */}
          <div className="md:col-span-7 bg-[#F8FAF8] border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6F9E2B]">
                    Workflow Phase {HOW_DSPACE_WORKS[activeStep].step}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    Open Access Standard
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0C1B33]">
                  {HOW_DSPACE_WORKS[activeStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {HOW_DSPACE_WORKS[activeStep].desc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2D5A27] font-medium bg-[#F2F9E8] p-3 rounded-lg border border-[#E5F4CE]">
                  <CheckCircle2 className="w-4 h-4 text-[#92C644] flex-shrink-0" />
                  <span>Compliant with Dublin Core and OAI-PMH interoperability standards</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Lyrasis Governance Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#F2F9E8] via-[#F8FAF8] to-white border border-[#E5F4CE] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#6F9E2B] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#92C644]" />
              <span>Community Stewardship</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0C1B33]">
              Governed under the Lyrasis Community Model
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              DSpace is an open-source software project governed under Lyrasis, a 501(c)(3) non-profit membership organization. Lyrasis provides fiscal stewardship, transparent community governance, and coordinates international release cycles.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://dspace.lyrasis.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#142646] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-colors shadow-sm"
            >
              <span>Visit DSpace.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#92C644]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
