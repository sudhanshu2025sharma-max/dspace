"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Database, BookOpen, CheckCircle2 } from "lucide-react";
import { NATIONAL_REPOSITORIES } from "@/lib/conference-data";

export const NationalRepositoriesSection: React.FC = () => {
  return (
    <section id="national-repositories" className="py-20 bg-[#F8FAF8] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#6F9E2B] bg-[#F2F9E8] px-2.5 py-1 rounded border border-[#E5F4CE]">
            National Scale Implementations: India
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0C1B33] tracking-tight">
            India&apos;s Largest Repositories: Shodhganga &amp; eGyanKosh
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            India represents one of the world&apos;s largest production deployments of DSpace software, powering nationwide institutional repositories that manage doctoral research and open distance learning.
          </p>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NATIONAL_REPOSITORIES.map((repo, idx) => {
            const isShodhganga = repo.id === "shodhganga";
            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F2F9E8] text-[#6F9E2B] border border-[#E5F4CE] flex items-center justify-center">
                        {isShodhganga ? (
                          <Database className="w-4 h-4 text-[#6F9E2B]" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-[#6F9E2B]" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#6F9E2B] block">
                          {repo.subtitle}
                        </span>
                        <h3 className="font-serif font-bold text-xl text-[#0C1B33]">
                          {repo.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2F9E8] text-[#6F9E2B] border border-[#E5F4CE]">
                      {repo.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0C1B33] block">
                      Core DSpace Capabilities:
                    </span>
                    <div className="space-y-1.5">
                      {repo.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#92C644] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E8F0]">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0C1B33] hover:bg-[#142646] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-colors"
                  >
                    <span>Visit {repo.name} Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#92C644]" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
