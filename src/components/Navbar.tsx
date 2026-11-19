"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/#about-dspace", label: "About DSpace" },
    { href: "/#national-repositories", label: "Shodhganga & eGyanKosh" },
    { href: "/#conference", label: "The Conference" },
    { href: "/#poster-guidelines", label: "Poster Guidelines" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#E4DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#12201D] text-[#F7F5F0] font-serif font-bold text-sm flex items-center justify-center">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-[#12201D] leading-tight">
              DSpace Jubilee 2026
            </span>
            <span className="text-[11px] text-[#5B6865] font-medium leading-tight">
              International Conference on Open Repositories
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#5B6865]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#12201D] transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          {pathname !== "/submit" ? (
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 bg-[#12201D] hover:bg-[#2A3835] text-[#F7F5F0] text-xs font-semibold px-4 py-2.5 rounded transition-colors shadow-sm"
            >
              <span>Submit Poster</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/"
              className="text-xs font-semibold text-[#12201D] hover:text-[#A24B27] transition-colors"
            >
              Back to Home
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#12201D]"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E4DFD5] bg-[#F7F5F0] px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-xs font-semibold uppercase tracking-wider text-[#12201D] py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E4DFD5]">
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#12201D] text-white text-xs font-semibold py-2.5 rounded"
            >
              Submit Poster
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
