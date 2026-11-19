"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Users } from "lucide-react";
import { CONFERENCE, ORGANIZERS } from "@/lib/conference-data";

export const AboutConferenceSection: React.FC = () => {
  return (
    <section id="conference" className="py-20 bg-white border-b border-[#E4DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A24B27]">
            Part 02: Occasion &amp; Organization
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#12201D] tracking-tight">
            The Jubilee Conference &amp; Steering Committee
          </h2>
          <p className="text-sm sm:text-base text-[#5B6865] leading-relaxed">
            The Jubilee marks more than twenty years since DSpace enabled academic institutions to maintain sovereign, open digital archives. We convene researchers, librarians, and developers to deliberate on the future of open science infrastructure.
          </p>
        </div>

        {/* Occasion and Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded bg-[#F7F5F0] border border-[#E4DFD5] space-y-3">
            <div className="w-8 h-8 rounded bg-white text-[#A24B27] flex items-center justify-center border border-[#E4DFD5]">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#12201D]">
              The Jubilee Milestone
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
              From its initial public release in 2002 to modern decoupled architectures, DSpace has empowered institutions worldwide to ensure long-term preservation and open access for scholarly research without commercial lock-in.
            </p>
          </div>

          <div className="p-6 rounded bg-[#F7F5F0] border border-[#E4DFD5] space-y-3">
            <div className="w-8 h-8 rounded bg-white text-[#A24B27] flex items-center justify-center border border-[#E4DFD5]">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#12201D]">
              Hybrid Assembly Format
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
              Convening from <strong>{CONFERENCE.dates}</strong>, the conference supports both in-person poster exhibitions in the Academic Senate Hall and synchronized virtual presentations for participants across all time zones.
            </p>
          </div>
        </div>

        {/* Steering Committee */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-[#A24B27]" />
            <h3 className="font-serif font-bold text-lg text-[#12201D]">
              Conference Steering Committee
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORGANIZERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-4 rounded bg-[#F7F5F0] border border-[#E4DFD5]"
              >
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#A24B27] block mb-1">
                  {member.role}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#12201D]">
                  {member.name}
                </h4>
                <p className="text-xs text-[#5B6865] mt-0.5">
                  {member.org}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
