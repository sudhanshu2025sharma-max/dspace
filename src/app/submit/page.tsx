import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SubmissionForm } from "@/components/SubmissionForm";
import { ArrowLeft, Info, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Poster Submission Portal | DSpace Jubilee Conference",
  description: "Submit your poster proposal for the DSpace Jubilee Conference via Google Drive.",
};

export default function SubmitPage() {
  return (
    <div className="py-8 md:py-12 bg-[#F8FAF8] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0C1B33] mb-3 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#92C644]" />
          <span>Back to Conference Home</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1.5 border border-[#E2E8F0] shadow-2xs flex items-center justify-center">
              <Image
                src="/dspace-logo.png"
                alt="DSpace Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0C1B33] tracking-tight">
                Poster Submission Portal
              </h1>
              <span className="text-[11px] text-[#64748B]">
                Peer-reviewed conference poster presentations
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#6F9E2B] bg-[#F2F9E8] border border-[#E5F4CE] font-bold self-start sm:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#92C644] animate-pulse" />
            Deadline: Sept 30, 2026
          </span>
        </div>

        {/* Compact Google Drive Guidance Bar */}
        <div className="mt-3 p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#475569] shadow-2xs">
          <Info className="w-4 h-4 text-[#92C644] flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong className="text-[#0C1B33]">Google Drive Poster Instructions:</strong> Upload your ISO A0 PDF to Google Drive, right-click &gt; <em>Share</em> &gt; set General Access to <em>&ldquo;Anyone with the link can view&rdquo;</em>, then copy and paste the share link below.
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SubmissionForm />
      </div>
    </div>
  );
}
