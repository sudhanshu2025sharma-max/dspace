"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Info,
} from "lucide-react";

export const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    email: "",
    institution: "",
    title: "",
    abstract: "",
    gdriveLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submissionId, setSubmissionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [simulated, setSimulated] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.authorName.trim()) {
      errs.authorName = "Full name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      errs.email = "Valid email is required.";
    }

    if (!formData.institution.trim()) {
      errs.institution = "Institution is required.";
    }

    if (!formData.title.trim() || formData.title.trim().length < 5) {
      errs.title = "Poster title is required.";
    }

    if (!formData.abstract.trim() || formData.abstract.trim().length < 20) {
      errs.abstract = "Brief abstract is required (minimum 20 characters).";
    }

    if (!formData.gdriveLink.trim() || !formData.gdriveLink.trim().startsWith("http")) {
      errs.gdriveLink = "Valid Google Drive link (https://drive.google.com/...) is required.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit poster proposal.");
      }

      setSubmitSuccess(true);
      setSubmissionId(data.submissionId);
      setSimulated(Boolean(data.simulated));
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submissionId) {
      navigator.clipboard.writeText(submissionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setFormData({
      authorName: "",
      email: "",
      institution: "",
      title: "",
      abstract: "",
      gdriveLink: "",
    });
    setSubmitSuccess(null);
    setSubmissionId("");
    setErrorMessage("");
    setFieldErrors({});
  };

  /* SUCCESS STATE (Compact, no extra scrolling) */
  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-[#E4DFD5] rounded p-6 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-[#E4DFD5]">
          <div className="w-9 h-9 rounded bg-[#E9F3EF] text-[#125740] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-[#12201D]">
              Poster Submission Received
            </h2>
            <p className="text-xs text-[#5B6865]">
              Confirmation email sent to <strong>{formData.email}</strong>. Administrative review alert dispatched.
            </p>
          </div>
        </div>

        {/* Reference ID Pill */}
        <div className="bg-[#F7F5F0] p-3.5 rounded border border-[#E4DFD5] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#5B6865] uppercase tracking-wider block">
              Reference ID
            </span>
            <span className="font-mono font-bold text-base text-[#12201D]">
              {submissionId}
            </span>
          </div>
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-[#E4DFD5] bg-white hover:bg-[#F7F5F0] text-[#12201D] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#125740]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Compact Metadata Summary */}
        <div className="text-xs space-y-1 text-[#2A3835] bg-[#F7F5F0] p-3 rounded border border-[#E4DFD5]">
          <div><strong>Title:</strong> {formData.title}</div>
          <div><strong>Author:</strong> {formData.authorName} ({formData.institution})</div>
          <div>
            <strong>Google Drive Link:</strong>{" "}
            <a
              href={formData.gdriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A24B27] underline break-all"
            >
              {formData.gdriveLink}
            </a>
          </div>
          {simulated && (
            <div className="text-[11px] text-[#A24B27] pt-1">
              (Preview Mode: Add GMAIL_USER and GMAIL_APP_PASSWORD in environment variables to deliver live emails).
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="bg-[#12201D] hover:bg-[#2A3835] text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
          >
            Submit Another Poster
          </button>
          <a
            href="/"
            className="text-xs font-semibold text-[#12201D] hover:text-[#A24B27] px-3 py-2 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </motion.div>
    );
  }

  /* FORM STATE (Ultra-compact 2-column grid, minimal scrolling) */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E4DFD5] rounded p-5 sm:p-7 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD5]">
        <div>
          <h2 className="font-serif font-bold text-lg text-[#12201D]">
            Poster Submission Form
          </h2>
          <p className="text-xs text-[#5B6865]">
            Enter author details, abstract, and your viewable Google Drive poster link.
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#A24B27] font-semibold uppercase">
          Required *
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 rounded bg-[#FAECE6] border border-[#E4DFD5] text-xs text-[#A24B27] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Author Name */}
        <div>
          <label className="block text-xs font-semibold text-[#12201D] mb-1">
            Author Full Name <span className="text-[#A24B27]">*</span>
          </label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder="e.g., Dr. Eleanor Vance"
            className={`w-full text-xs px-3 py-2 rounded border ${
              fieldErrors.authorName ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
            } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0]`}
          />
          {fieldErrors.authorName && (
            <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.authorName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#12201D] mb-1">
            Academic Email <span className="text-[#A24B27]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., e.vance@university.edu"
            className={`w-full text-xs px-3 py-2 rounded border ${
              fieldErrors.email ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
            } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0]`}
          />
          {fieldErrors.email && (
            <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.email}</p>
          )}
        </div>

        {/* Institution */}
        <div>
          <label className="block text-xs font-semibold text-[#12201D] mb-1">
            Institution / University <span className="text-[#A24B27]">*</span>
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g., MIT Libraries"
            className={`w-full text-xs px-3 py-2 rounded border ${
              fieldErrors.institution ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
            } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0]`}
          />
          {fieldErrors.institution && (
            <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.institution}</p>
          )}
        </div>

        {/* Poster Title */}
        <div>
          <label className="block text-xs font-semibold text-[#12201D] mb-1">
            Poster Title <span className="text-[#A24B27]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Automated REST Ingestion Pipelines in DSpace 7"
            className={`w-full text-xs px-3 py-2 rounded border ${
              fieldErrors.title ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
            } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0]`}
          />
          {fieldErrors.title && (
            <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.title}</p>
          )}
        </div>
      </div>

      {/* Abstract (Full width, compact 3 rows) */}
      <div>
        <label className="block text-xs font-semibold text-[#12201D] mb-1">
          Brief Abstract / Summary <span className="text-[#A24B27]">*</span>
        </label>
        <textarea
          name="abstract"
          rows={3}
          value={formData.abstract}
          onChange={handleChange}
          placeholder="Brief summary outlining institutional context, technical implementation in DSpace, and outcomes..."
          className={`w-full text-xs p-2.5 rounded border ${
            fieldErrors.abstract ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
          } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0] leading-relaxed`}
        />
        {fieldErrors.abstract && (
          <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.abstract}</p>
        )}
      </div>

      {/* Google Drive Link (Full width) */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-[#12201D]">
            Google Drive Link to Poster PDF <span className="text-[#A24B27]">*</span>
          </label>
          <span className="text-[10px] text-[#5B6865]">
            Set sharing: &ldquo;Anyone with the link can view&rdquo;
          </span>
        </div>
        <input
          type="url"
          name="gdriveLink"
          value={formData.gdriveLink}
          onChange={handleChange}
          placeholder="https://drive.google.com/file/d/..."
          className={`w-full text-xs px-3 py-2 rounded border ${
            fieldErrors.gdriveLink ? "border-[#A24B27] bg-[#FAECE6]" : "border-[#E4DFD5]"
          } focus:border-[#12201D] focus:outline-none bg-[#F7F5F0]`}
        />
        {fieldErrors.gdriveLink && (
          <p className="text-[10px] text-[#A24B27] mt-0.5">{fieldErrors.gdriveLink}</p>
        )}
      </div>

      {/* Bottom Submit Action */}
      <div className="pt-2 border-t border-[#E4DFD5] flex items-center justify-between">
        <span className="text-[11px] text-[#5B6865]">
          Direct verification emails triggered on submission.
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 bg-[#12201D] hover:bg-[#2A3835] disabled:opacity-60 text-white text-xs font-semibold px-5 py-2.5 rounded transition-colors shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Poster</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
