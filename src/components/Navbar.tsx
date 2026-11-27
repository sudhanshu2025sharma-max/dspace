"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/#national-repositories", label: "Shodhganga & eGyanKosh" },
    { href: "/#poster-guidelines", label: "Poster Guidelines" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand with Official DSpace Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center p-1 rounded-lg bg-[#F2F9E8] border border-[#E5F4CE] group-hover:border-[#92C644] transition-colors">
            <Image
              src="/dspace-logo.png"
              alt="DSpace Logo"
              width={34}
              height={34}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-[#0C1B33] leading-tight">
                DSpace Jubilee 2026
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#F2F9E8] text-[#6F9E2B] border border-[#E5F4CE]">
                Silver Jubilee
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-medium leading-tight">
              International Conference on Open Repositories
            </span>
          </div>
        </Link>

        {/* Desktop Links & Action Button shifted to right */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#475569]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#0C1B33] hover:text-[#6F9E2B] transition-colors py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#92C644] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {pathname !== "/submit" ? (
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 bg-[#92C644] hover:bg-[#82B438] text-[#0C1B33] text-xs font-bold px-4 py-2.5 rounded-md transition-all shadow-sm hover:shadow-dspace-sm active:scale-98"
            >
              <span>Submit Poster</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/"
              className="text-xs font-semibold text-[#0C1B33] hover:text-[#6F9E2B] transition-colors px-3 py-2 rounded-md hover:bg-[#F2F9E8]"
            >
              &larr; Back to Home
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#0C1B33] rounded-md hover:bg-[#F1F5F9]"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-xs font-semibold uppercase tracking-wider text-[#0C1B33] hover:text-[#6F9E2B] py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#92C644] hover:bg-[#82B438] text-[#0C1B33] text-xs font-bold py-2.5 rounded shadow-sm"
            >
              Submit Poster Proposal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
