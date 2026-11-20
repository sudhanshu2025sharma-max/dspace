"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Copy,
  Check,
  Info,
  Mail,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
  simulated?: boolean;
  errorType?: string;
  details?: {
    submitterEmail?: string;
    submitterDelivered?: boolean;
    adminEmail?: string;
    adminDelivered?: boolean;
    simulated?: boolean;
  };
  errors?: Record<string, string>;
}

interface MailCheckState {
  checking: boolean;
  checked: boolean;
  verified: boolean;
  simulated: boolean;
  message: string;
  user?: string;
  admin?: string;
}

export const SubmissionForm: React.FC = () => {
  const topPromptRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    authorName: "",
    email: "",
    institution: "",
    title: "",
    abstract: "",
    gdriveLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [promptMessage, setPromptMessage] = useState<{
    type: "success" | "error" | "info";
    title: string;
    description: string;
    troubleshooting?: string[];
  } | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Email diagnostic check state
  const [mailCheck, setMailCheck] = useState<MailCheckState>({
    checking: false,
    checked: false,
    verified: false,
    simulated: false,
    message: "",
  });
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  // Auto-scroll to top prompt when promptMessage changes
  useEffect(() => {
    if (promptMessage && topPromptRef.current) {
      topPromptRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [promptMessage]);

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
      errs.email = "Valid academic email address is required.";
    }

    if (!formData.institution.trim()) {
      errs.institution = "Institution / University is required.";
    }

    if (!formData.title.trim() || formData.title.trim().length < 5) {
      errs.title = "Poster title is required (minimum 5 characters).";
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

  // Run real-time diagnostic check on Gmail configuration
  const handleTestMailConfig = async () => {
    setMailCheck((prev) => ({ ...prev, checking: true, message: "" }));
    setShowDiagnostic(true);

    try {
      const res = await fetch("/api/check-email");
      const data = await res.json();

      setMailCheck({
        checking: false,
        checked: true,
        verified: Boolean(data.verified),
        simulated: Boolean(data.simulated),
        message: data.message || (data.verified ? "Gmail verified" : "Failed to verify"),
        user: data.user,
        admin: data.admin,
      });
    } catch (err: any) {
      setMailCheck({
        checking: false,
        checked: true,
        verified: false,
        simulated: false,
        message: `Network error connecting to diagnostic check: ${err?.message || "Unknown"}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromptMessage(null);

    if (!validate()) {
      setPromptMessage({
        type: "error",
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with * before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: SubmissionResponse = await res.json();

      if (!res.ok || !data.success) {
        // Build helpful troubleshooting guidance if email failed
        const troubleshooting: string[] = [];
        if (data.errorType === "AUTH_FAILED" || res.status === 502) {
          troubleshooting.push(
            "Verify that GMAIL_USER in .env.local is your actual email (e.g. without 'your-' prefix)."
          );
          troubleshooting.push(
            "Ensure Google 2-Step Verification is active on your Google Account."
          );
          troubleshooting.push(
            "Generate a 16-character App Password at https://myaccount.google.com/apppasswords and paste it into GMAIL_APP_PASSWORD."
          );
          troubleshooting.push(
            "If running locally, restart your development server (Ctrl+C then 'npm run dev'). If on Vercel, re-deploy after setting variables."
          );
        }

        setPromptMessage({
          type: "error",
          title: "Poster Submission Failed",
          description:
            data.message ||
            "Unable to process your submission. The email notification service returned an error.",
          troubleshooting: troubleshooting.length > 0 ? troubleshooting : undefined,
        });

        if (data.errors) {
          setFieldErrors(data.errors);
        }
        return;
      }

      // Success path
      setSubmissionResult(data);

      if (data.simulated) {
        setPromptMessage({
          type: "info",
          title: "Submission Saved (Local Simulation Mode)",
          description: `Reference ID ${data.submissionId} recorded. Note: Live email delivery was skipped because Gmail is in simulation mode. Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local to dispatch live emails.`,
        });
      } else {
        setPromptMessage({
          type: "success",
          title: "Poster Proposal Submitted Successfully!",
          description: `Reference ID ${data.submissionId} registered. A confirmation email has been dispatched to ${formData.email}, and an administrative alert has been sent to the review committee.`,
        });
      }
    } catch (err: any) {
      console.error("[FORM SUBMIT ERROR]", err);
      setPromptMessage({
        type: "error",
        title: "Connection or Server Error",
        description:
          err.message ||
          "Could not establish a connection with the server. Please check your internet or try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submissionResult?.submissionId) {
      navigator.clipboard.writeText(submissionResult.submissionId);
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
    setSubmissionResult(null);
    setPromptMessage(null);
    setFieldErrors({});
    setShowDiagnostic(false);
  };

  return (
    <div className="space-y-4" ref={topPromptRef}>
      {/* 1. VISIBLE PROMPT BANNER (SUCCESS / FAILURE / NOTICE) */}
      <AnimatePresence mode="wait">
        {promptMessage && (
          <motion.div
            key={promptMessage.title}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`p-4 sm:p-5 rounded-xl border shadow-sm ${
              promptMessage.type === "success"
                ? "bg-[#F2F9E8] border-[#92C644] text-[#2D5A27]"
                : promptMessage.type === "error"
                ? "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]"
                : "bg-[#FFFBEB] border-[#F59E0B] text-[#B45309]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {promptMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-[#92C644]" />
                ) : promptMessage.type === "error" ? (
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base">
                    {promptMessage.title}
                  </h3>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      promptMessage.type === "success"
                        ? "bg-[#92C644] text-[#0C1B33]"
                        : promptMessage.type === "error"
                        ? "bg-[#EF4444] text-white"
                        : "bg-[#F59E0B] text-white"
                    }`}
                  >
                    {promptMessage.type === "success"
                      ? "Success"
                      : promptMessage.type === "error"
                      ? "Check Failed"
                      : "Notice"}
                  </span>
                </div>

                <p className="text-xs leading-relaxed opacity-95">
                  {promptMessage.description}
                </p>

                {/* Optional Actionable Troubleshooting Guidance */}
                {promptMessage.troubleshooting && (
                  <div className="mt-3 pt-3 border-t border-[#E2E8F0] bg-white/70 p-3 rounded-lg text-xs space-y-1 text-[#334155]">
                    <div className="font-semibold text-[11px] uppercase tracking-wider text-[#0C1B33] mb-1">
                      Recommended Steps to Fix:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                      {promptMessage.troubleshooting.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SUCCESS VIEW */}
      {submissionResult && submissionResult.success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-full bg-[#F2F9E8] text-[#92C644] flex items-center justify-center flex-shrink-0 border border-[#E5F4CE]">
              <CheckCircle2 className="w-6 h-6 text-[#92C644]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-[#0C1B33]">
                Poster Submission Dossier Registered
              </h2>
              <p className="text-xs text-[#64748B]">
                {submissionResult.simulated
                  ? "Submission logged into test register (Simulation mode active)."
                  : `Confirmation email dispatched to ${formData.email} and admin committee notified.`}
              </p>
            </div>
          </div>

          {/* Reference ID Pill with One-Click Copy */}
          <div className="bg-[#F8FAF8] p-3.5 rounded-lg border border-[#E2E8F0] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                Reference Registration ID
              </span>
              <span className="font-mono font-bold text-lg text-[#0C1B33]">
                {submissionResult.submissionId}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-white hover:bg-[#F2F9E8] text-[#0C1B33] transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#92C644]" />
                  <span className="text-[#6F9E2B]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Email Delivery Status Checks Indicator */}
          <div className="p-3.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAF8] space-y-2 text-xs">
            <div className="text-[11px] font-semibold text-[#0C1B33] uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#92C644]" />
              <span>Email Delivery Status Checks:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#E2E8F0]">
                {submissionResult.simulated ? (
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#92C644] flex-shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-semibold text-[#0C1B33]">Author Confirmation</div>
                  <div className="text-[11px] text-[#64748B] truncate">
                    {submissionResult.simulated
                      ? "Simulation: Skipped"
                      : `Delivered to ${formData.email}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#E2E8F0]">
                {submissionResult.simulated ? (
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#92C644] flex-shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-semibold text-[#0C1B33]">Committee Alert</div>
                  <div className="text-[11px] text-[#64748B] truncate">
                    {submissionResult.simulated
                      ? "Simulation: Skipped"
                      : "Delivered to admin review"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Summary */}
          <div className="text-xs space-y-1.5 text-[#334155] bg-[#F8FAF8] p-3.5 rounded-lg border border-[#E2E8F0]">
            <div>
              <strong className="text-[#0C1B33]">Poster Title:</strong> {formData.title}
            </div>
            <div>
              <strong className="text-[#0C1B33]">Author:</strong> {formData.authorName} (
              {formData.institution})
            </div>
            <div>
              <strong className="text-[#0C1B33]">Google Drive Poster Link:</strong>{" "}
              <a
                href={formData.gdriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#006699] hover:underline break-all inline-flex items-center gap-1 font-medium"
              >
                <span>{formData.gdriveLink}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0 text-[#92C644]" />
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleReset}
              className="bg-[#0C1B33] hover:bg-[#142646] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Submit Another Poster
            </button>
            <a
              href="/"
              className="text-xs font-semibold text-[#0C1B33] hover:text-[#6F9E2B] px-3 py-2.5 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      ) : (
        /* 3. SUBMISSION FORM */
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-7 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#0C1B33]">
                Poster Submission Form
              </h2>
              <p className="text-xs text-[#64748B]">
                Provide author details, abstract, and your shareable Google Drive link.
              </p>
            </div>

            {/* Quick Diagnostic Button */}
            <button
              type="button"
              onClick={handleTestMailConfig}
              disabled={mailCheck.checking}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#475569] hover:text-[#0C1B33] bg-[#F8FAF8] hover:bg-[#F2F9E8] px-2.5 py-1.5 rounded-md border border-[#E2E8F0] hover:border-[#92C644] transition-colors"
              title="Verify Gmail SMTP connection and credentials"
            >
              {mailCheck.checking ? (
                <RefreshCw className="w-3 h-3 animate-spin text-[#92C644]" />
              ) : (
                <Mail className="w-3 h-3 text-[#92C644]" />
              )}
              <span>{mailCheck.checking ? "Checking..." : "Check Email Setup"}</span>
            </button>
          </div>

          {/* Diagnostic Result Box (when checked) */}
          {showDiagnostic && mailCheck.checked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`p-3 rounded-lg border text-xs space-y-1 ${
                mailCheck.verified
                  ? "bg-[#F2F9E8] border-[#92C644] text-[#2D5A27]"
                  : mailCheck.simulated
                  ? "bg-[#FFFBEB] border-[#F59E0B] text-[#B45309]"
                  : "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]"
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  {mailCheck.verified ? (
                    <ShieldCheck className="w-4 h-4 text-[#92C644]" />
                  ) : mailCheck.simulated ? (
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                  )}
                  {mailCheck.verified
                    ? "Gmail SMTP Service Active & Verified"
                    : mailCheck.simulated
                    ? "Email In Simulation Mode"
                    : "Gmail Configuration Attention Required"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowDiagnostic(false)}
                  className="text-[10px] underline uppercase"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[11px] whitespace-pre-line leading-relaxed">
                {mailCheck.message}
              </p>
              {mailCheck.user && (
                <div className="text-[10px] font-mono opacity-80 pt-1">
                  Active Gmail User: {mailCheck.user}
                </div>
              )}
            </motion.div>
          )}

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold text-[#0C1B33] mb-1">
                Author Full Name <span className="text-[#92C644]">*</span>
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g., Dr. Eleanor Vance"
                className={`w-full text-xs px-3 py-2.5 rounded-md border ${
                  fieldErrors.authorName
                    ? "border-[#EF4444] bg-[#FEF2F2]"
                    : "border-[#E2E8F0] focus:border-[#92C644]"
                } focus:outline-none bg-[#F8FAF8] focus:bg-white transition-colors disabled:opacity-70`}
              />
              {fieldErrors.authorName && (
                <p className="text-[10px] text-[#EF4444] mt-0.5">
                  {fieldErrors.authorName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#0C1B33] mb-1">
                Academic Email (Will receive confirmation){" "}
                <span className="text-[#92C644]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g., e.vance@university.edu"
                className={`w-full text-xs px-3 py-2.5 rounded-md border ${
                  fieldErrors.email
                    ? "border-[#EF4444] bg-[#FEF2F2]"
                    : "border-[#E2E8F0] focus:border-[#92C644]"
                } focus:outline-none bg-[#F8FAF8] focus:bg-white transition-colors disabled:opacity-70`}
              />
              {fieldErrors.email && (
                <p className="text-[10px] text-[#EF4444] mt-0.5">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Institution */}
            <div>
              <label className="block text-xs font-semibold text-[#0C1B33] mb-1">
                Institution / University <span className="text-[#92C644]">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g., MIT Libraries"
                className={`w-full text-xs px-3 py-2.5 rounded-md border ${
                  fieldErrors.institution
                    ? "border-[#EF4444] bg-[#FEF2F2]"
                    : "border-[#E2E8F0] focus:border-[#92C644]"
                } focus:outline-none bg-[#F8FAF8] focus:bg-white transition-colors disabled:opacity-70`}
              />
              {fieldErrors.institution && (
                <p className="text-[10px] text-[#EF4444] mt-0.5">
                  {fieldErrors.institution}
                </p>
              )}
            </div>

            {/* Poster Title */}
            <div>
              <label className="block text-xs font-semibold text-[#0C1B33] mb-1">
                Poster Title <span className="text-[#92C644]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g., Automated REST Ingestion Pipelines in DSpace 7"
                className={`w-full text-xs px-3 py-2.5 rounded-md border ${
                  fieldErrors.title
                    ? "border-[#EF4444] bg-[#FEF2F2]"
                    : "border-[#E2E8F0] focus:border-[#92C644]"
                } focus:outline-none bg-[#F8FAF8] focus:bg-white transition-colors disabled:opacity-70`}
              />
              {fieldErrors.title && (
                <p className="text-[10px] text-[#EF4444] mt-0.5">
                  {fieldErrors.title}
                </p>
              )}
            </div>
          </div>

          {/* Abstract */}
          <div>
            <label className="block text-xs font-semibold text-[#0C1B33] mb-1">
              Brief Abstract / Summary <span className="text-[#92C644]">*</span>
            </label>
            <textarea
              name="abstract"
              rows={3}
              value={formData.abstract}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Brief summary outlining institutional context, technical implementation in DSpace, and outcomes (minimum 20 characters)..."
              className={`w-full text-xs p-3 rounded-md border ${
                fieldErrors.abstract
                  ? "border-[#EF4444] bg-[#FEF2F2]"
                  : "border-[#E2E8F0] focus:border-[#92C644]"
              } focus:outline-none bg-[#F8FAF8] focus:bg-white leading-relaxed disabled:opacity-70 transition-colors`}
            />
            {fieldErrors.abstract && (
              <p className="text-[10px] text-[#EF4444] mt-0.5">
                {fieldErrors.abstract}
              </p>
            )}
          </div>

          {/* Google Drive Link */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#0C1B33]">
                Google Drive Link to Poster PDF <span className="text-[#92C644]">*</span>
              </label>
              <span className="text-[10px] text-[#64748B]">
                Access must be: &ldquo;Anyone with the link can view&rdquo;
              </span>
            </div>
            <input
              type="url"
              name="gdriveLink"
              value={formData.gdriveLink}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="https://drive.google.com/file/d/..."
              className={`w-full text-xs px-3 py-2.5 rounded-md border ${
                fieldErrors.gdriveLink
                  ? "border-[#EF4444] bg-[#FEF2F2]"
                  : "border-[#E2E8F0] focus:border-[#92C644]"
              } focus:outline-none bg-[#F8FAF8] focus:bg-white transition-colors disabled:opacity-70`}
            />
            {fieldErrors.gdriveLink && (
              <p className="text-[10px] text-[#EF4444] mt-0.5">
                {fieldErrors.gdriveLink}
              </p>
            )}
          </div>

          {/* Bottom Submit Action */}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] text-[#64748B]">
              Direct confirmation emails dispatched upon submission.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-[#92C644] hover:bg-[#82B438] disabled:opacity-60 text-[#0C1B33] text-xs font-bold px-6 py-3 rounded-md transition-all shadow-dspace-sm hover:shadow-dspace-md active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0C1B33]" />
                  <span>Submitting &amp; Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#0C1B33]" />
                  <span>Submit Poster Proposal</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
