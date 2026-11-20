import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";
import { CONFERENCE } from "@/lib/conference-data";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C1B33] text-[#94A3B8] py-14 text-xs border-t border-[#1F355E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1F355E]">
          {/* Identity with DSpace Logo */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-white p-1 flex items-center justify-center">
                <Image
                  src="/dspace-logo.png"
                  alt="DSpace Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="font-serif font-bold text-base text-white">
                {CONFERENCE.title} 2026
              </div>
            </div>
            <p className="max-w-sm text-[#94A3B8] leading-relaxed">
              Commemorating more than two decades of open-source repository innovation. Governed under the non-profit stewardship of Lyrasis.
            </p>
            <div className="flex items-center gap-2 text-white font-medium pt-1">
              <Mail className="w-3.5 h-3.5 text-[#92C644]" />
              <a href={`mailto:${CONFERENCE.contactEmail}`} className="hover:text-[#92C644] transition-colors">
                {CONFERENCE.contactEmail}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Conference Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/#about-dspace" className="hover:text-[#92C644] transition-colors">
                  About DSpace
                </Link>
              </li>
              <li>
                <Link href="/#national-repositories" className="hover:text-[#92C644] transition-colors">
                  Shodhganga &amp; eGyanKosh
                </Link>
              </li>
              <li>
                <Link href="/#conference" className="hover:text-[#92C644] transition-colors">
                  The Conference
                </Link>
              </li>
              <li>
                <Link href="/#poster-guidelines" className="hover:text-[#92C644] transition-colors">
                  Poster Guidelines
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-[#92C644] hover:text-white font-semibold transition-colors">
                  Submit Poster Proposal &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Repository Portals
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://shodhganga.inflibnet.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Shodhganga (INFLIBNET)</span>
                  <ExternalLink className="w-3 h-3 text-[#92C644]" />
                </a>
              </li>
              <li>
                <a
                  href="https://egyankosh.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>eGyanKosh (IGNOU)</span>
                  <ExternalLink className="w-3 h-3 text-[#92C644]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dspace.lyrasis.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>DSpace.org</span>
                  <ExternalLink className="w-3 h-3 text-[#92C644]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.lyrasis.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Lyrasis Organization</span>
                  <ExternalLink className="w-3 h-3 text-[#92C644]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <div>
            &copy; {new Date().getFullYear()} DSpace Community and Lyrasis. All rights reserved.
          </div>
          <div>
            DSpace is released under the BSD 3-Clause Open Source License.
          </div>
        </div>
      </div>
    </footer>
  );
};
