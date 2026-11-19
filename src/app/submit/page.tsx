import React from "react";
import Link from "next/link";
import { SubmissionForm } from "@/components/SubmissionForm";
import { ArrowLeft, Info } from "lucide-react";

export const metadata = {
  title: "Poster Submission | DSpace Jubilee Conference",
  description: "Submit your poster proposal for the DSpace Jubilee Conference via Google Drive.",
};

export default function SubmitPage() {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#5B6865] hover:text-[#12201D] mb-3 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Conference Home</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#12201D] tracking-tight">
            Poster Submission Portal
          </h1>
          <span className="text-[11px] font-mono text-[#A24B27] font-semibold">
            Deadline: September 30, 2026
          </span>
        </div>

        {/* Compact Google Drive Guidance Bar */}
        <div className="mt-2.5 p-2.5 rounded bg-white border border-[#E4DFD5] flex items-center gap-2 text-xs text-[#5B6865]">
          <Info className="w-4 h-4 text-[#A24B27] flex-shrink-0" />
          <span className="text-[11px] leading-tight">
            <strong>Google Drive File:</strong> Upload your A0 PDF to Google Drive, set access to <em>&ldquo;Anyone with the link can view&rdquo;</em>, and paste the link below.
          </span>
        </div>
      </div>

      {/* Compact Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SubmissionForm />
      </div>
    </div>
  );
}
