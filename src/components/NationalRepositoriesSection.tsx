"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Database, BookOpen, CheckCircle2 } from "lucide-react";
import { NATIONAL_REPOSITORIES } from "@/lib/conference-data";

export const NationalRepositoriesSection: React.FC = () => {
  return (
    <section id="national-repositories" className="py-20 bg-[#F7F5F0] border-b border-[#E4DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#125740]">
            National Scale Implementations: India
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#12201D] tracking-tight">
            India&apos;s Largest Repositories: Shodhganga &amp; eGyanKosh
          </h2>
          <p className="text-sm sm:text-base text-[#5B6865] leading-relaxed">
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
                className="bg-white rounded border border-[#E4DFD5] p-6 sm:p-8 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD5]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#E9F3EF] text-[#125740] flex items-center justify-center">
                        {isShodhganga ? (
                          <Database className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#125740] block">
                          {repo.subtitle}
                        </span>
                        <h3 className="font-serif font-bold text-xl text-[#12201D]">
                          {repo.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E9F3EF] text-[#125740] border border-[#C4DFD5]">
                      {repo.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5B6865] leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#12201D] block">
                      Core DSpace Capabilities:
                    </span>
                    <div className="space-y-1.5">
                      {repo.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#2A3835]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#125740] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E4DFD5]">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#125740] hover:bg-[#0E4633] text-white text-xs font-semibold px-4 py-2.5 rounded transition-colors"
                  >
                    <span>Visit {repo.name} Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
