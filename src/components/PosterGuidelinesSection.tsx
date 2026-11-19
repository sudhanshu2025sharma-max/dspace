"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { POSTER_GUIDELINES } from "@/lib/conference-data";

export const PosterGuidelinesSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const specs = [
    { label: "Dimensions", value: "ISO A0 Portrait", detail: "841 mm x 1189 mm (vertical only)" },
    { label: "Digital File", value: "Google Drive Share Link", detail: "PDF format, view access" },
    { label: "Close Date", value: "September 30, 2026", detail: "Strict deadline at 23:59 UTC" },
    { label: "Evaluation", value: "Double-Blind Review", detail: "Peer reviewed by committee" },
  ];

  return (
    <section id="poster-guidelines" className="py-20 bg-[#F7F5F0] border-b border-[#E4DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A24B27]">
            Part 03: Call for Posters &amp; Submission
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#12201D] tracking-tight">
            Poster Structure Details &amp; Guidelines
          </h2>
          <p className="text-sm sm:text-base text-[#5B6865] leading-relaxed">
            All poster proposals must adhere to the standard ISO A0 structure below. Authors upload their poster PDF to Google Drive and submit the viewable link via the submission portal.
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {specs.map((item) => (
            <div key={item.label} className="p-4 rounded bg-white border border-[#E4DFD5]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A24B27] block mb-1">
                {item.label}
              </span>
              <div className="font-serif font-bold text-sm text-[#12201D]">
                {item.value}
              </div>
              <p className="text-[11px] text-[#5B6865] mt-0.5">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Required Structural Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-14">
          {/* Section Selector List */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="text-sm font-serif font-bold text-[#12201D] mb-3">
              Required Structural Sections:
            </h3>
            {POSTER_GUIDELINES.sections.map((sec, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={sec.num}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-3.5 rounded border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? "bg-[#12201D] text-white border-[#12201D] font-semibold shadow-sm"
                      : "bg-white text-[#12201D] border-[#E4DFD5] hover:border-[#C8C2B5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[#A24B27]">
                      {sec.num}
                    </span>
                    <span>{sec.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-[#C8C2B5]" : "text-[#5B6865]"}`}>
                    {isSelected ? "Selected" : "Inspect"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section Detail View */}
          <div className="md:col-span-7 bg-white border border-[#E4DFD5] rounded p-6 sm:p-7 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A24B27] block">
                  Section {POSTER_GUIDELINES.sections[selectedIdx].num} Breakdown
                </span>
                <h4 className="font-serif font-bold text-lg text-[#12201D]">
                  {POSTER_GUIDELINES.sections[selectedIdx].name}
                </h4>
                <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
                  {POSTER_GUIDELINES.sections[selectedIdx].detail}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#125740] font-medium border-t border-[#E4DFD5]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Required structural component for peer review assessment</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded bg-[#12201D] text-[#F7F5F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-[#C8C2B5] uppercase tracking-wider">
              Submissions Open: Deadline September 30, 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F5F0]">
              Proceed to the Poster Submission Page
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C2B5] leading-relaxed">
              Submit your poster details and Google Drive link. You will receive an immediate confirmation email, and the administrative committee will receive your submission dossier.
            </p>
          </div>

          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-[#A24B27] hover:bg-[#883C1D] text-[#F7F5F0] text-sm font-semibold px-6 py-3.5 rounded transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Open Submission Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
