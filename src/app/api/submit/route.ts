import { NextRequest, NextResponse } from "next/server";
import { sendSubmissionEmails, SimpleSubmissionPayload } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { authorName, email, institution, title, abstract, gdriveLink } = body;

    const errors: Record<string, string> = {};

    if (!authorName || typeof authorName !== "string" || authorName.trim().length < 2) {
      errors.authorName = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!institution || typeof institution !== "string" || institution.trim().length < 2) {
      errors.institution = "Please enter your institution or university.";
    }

    if (!title || typeof title !== "string" || title.trim().length < 5) {
      errors.title = "Please enter the poster title (minimum 5 characters).";
    }

    if (!abstract || typeof abstract !== "string" || abstract.trim().length < 20) {
      errors.abstract = "Please enter a brief abstract or summary of the poster.";
    }

    if (!gdriveLink || typeof gdriveLink !== "string" || !gdriveLink.trim().startsWith("http")) {
      errors.gdriveLink = "Please provide a valid Google Drive share link (https://drive.google.com/...).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted errors in the form.",
          errors,
        },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `DSP-JUB-${randomNum}`;

    const payload: SimpleSubmissionPayload = {
      submissionId,
      authorName: authorName.trim(),
      email: email.trim().toLowerCase(),
      institution: institution.trim(),
      title: title.trim(),
      abstract: abstract.trim(),
      gdriveLink: gdriveLink.trim(),
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    const mailResult = await sendSubmissionEmails(payload);

    if (!mailResult.success) {
      return NextResponse.json(
        {
          success: false,
          submissionId,
          errorType: mailResult.errorType || "SEND_FAILED",
          message:
            mailResult.error ||
            "Failed to dispatch email notifications. Check server mailer configuration.",
          details: mailResult.details,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        submissionId,
        simulated: Boolean(mailResult.simulated),
        message: mailResult.simulated
          ? "Poster proposal received in local simulation mode. Gmail credentials are not configured, so live emails were skipped."
          : `Poster proposal submitted successfully! A confirmation email has been sent to ${payload.email} and notification forwarded to the conference committee.`,
        details: mailResult.details,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API SUBMIT EXCEPTION]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your submission.",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
