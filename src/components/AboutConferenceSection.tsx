"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Users } from "lucide-react";
import { CONFERENCE, ORGANIZERS } from "@/lib/conference-data";

export const AboutConferenceSection: React.FC = () => {
  return (
    <section id="conference" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#6F9E2B] bg-[#F2F9E8] px-2.5 py-1 rounded border border-[#E5F4CE]">
            Part 02: Occasion &amp; Organization
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0C1B33] tracking-tight">
            The Jubilee Conference &amp; Steering Committee
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            The Jubilee marks more than twenty years since DSpace enabled academic institutions worldwide to maintain sovereign, open digital archives. We convene researchers, librarians, and repository engineers to deliberate on the future of open science infrastructure.
          </p>
        </div>

        {/* Occasion and Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] space-y-3 hover:border-[#CBD5E1] transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#F2F9E8] text-[#6F9E2B] border border-[#E5F4CE] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#6F9E2B]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0C1B33]">
              The Jubilee Milestone
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              From its initial public release in 2002 to modern decoupled REST architectures in DSpace 7, DSpace has empowered institutions worldwide to ensure long-term digital preservation and open access for scholarly research without commercial lock-in.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] space-y-3 hover:border-[#CBD5E1] transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#F2F9E8] text-[#6F9E2B] border border-[#E5F4CE] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#6F9E2B]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0C1B33]">
              Hybrid Assembly Format
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Convening from <strong>{CONFERENCE.dates}</strong>, the conference supports both in-person poster exhibitions in the Academic Senate Hall and synchronized virtual presentations for participants across all time zones.
            </p>
          </div>
        </div>

        {/* Steering Committee */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-[#92C644]" />
            <h3 className="font-serif font-bold text-lg text-[#0C1B33]">
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
                className="p-4 rounded-lg bg-[#F8FAF8] border border-[#E2E8F0] hover:border-[#92C644] transition-colors"
              >
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#6F9E2B] block mb-1">
                  {member.role}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#0C1B33]">
                  {member.name}
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
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
