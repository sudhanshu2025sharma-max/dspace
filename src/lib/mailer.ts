import nodemailer from "nodemailer";

export interface SimpleSubmissionPayload {
  submissionId: string;
  authorName: string;
  email: string;
  institution: string;
  title: string;
  abstract: string;
  gdriveLink: string;
  submittedAt: string;
}

interface MailResult {
  success: boolean;
  messageIdAdmin?: string;
  messageIdSubmitter?: string;
  error?: string;
  simulated?: boolean;
}

export async function sendSubmissionEmails(
  payload: SimpleSubmissionPayload
): Promise<MailResult> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL || gmailUser || "admin@example.com";
  const conferenceName = process.env.CONFERENCE_NAME || "DSpace Jubilee Conference";

  // If credentials are not yet configured in environment variables, run in simulated mode
  if (!gmailUser || !gmailAppPassword) {
    console.warn(
      "[MAILER] GMAIL_USER or GMAIL_APP_PASSWORD not set. Running in local dry-run mode."
    );
    return {
      success: true,
      simulated: true,
      error:
        "Submission received in local simulation mode. To dispatch live emails, add GMAIL_USER and GMAIL_APP_PASSWORD to your .env.local or Vercel Environment Variables.",
    };
  }

  // Remove any whitespace from the 16-character Google App Password
  const sanitizedPassword = gmailAppPassword.replace(/\s+/g, "");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: sanitizedPassword,
    },
  });

  // Verify connection
  try {
    await transporter.verify();
  } catch (verifyErr: any) {
    console.error("[MAILER VERIFY ERROR]", verifyErr?.message || verifyErr);
    return {
      success: false,
      error: `Gmail SMTP authentication failed. Please verify your 16-character App Password: ${
        verifyErr?.message || "Invalid credentials"
      }`,
    };
  }

  // 1. Email to Submitter
  const submitterHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F5F0; margin: 0; padding: 24px; color: #12201D; }
        .box { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E4DFD5; border-radius: 6px; overflow: hidden; }
        .head { background: #12201D; color: #F7F5F0; padding: 24px 28px; }
        .head h1 { margin: 0 0 4px 0; font-size: 18px; font-weight: 700; }
        .head p { margin: 0; font-size: 12px; color: #C8C2B5; }
        .content { padding: 28px; font-size: 14px; line-height: 1.6; color: #2A3835; }
        .badge { display: inline-block; background: #F7F5F0; color: #A24B27; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; border: 1px solid #E4DFD5; margin-bottom: 16px; font-family: monospace; }
        .summary { background: #F7F5F0; border: 1px solid #E4DFD5; border-radius: 4px; padding: 16px; margin: 16px 0; font-size: 13px; }
        .summary p { margin: 6px 0; }
        .summary strong { color: #12201D; }
        .foot { background: #F7F5F0; padding: 16px 28px; font-size: 11px; color: #5B6865; border-top: 1px solid #E4DFD5; text-align: center; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="head">
          <h1>${conferenceName}</h1>
          <p>Jubilee Celebration: Poster Submission Acknowledgment</p>
        </div>
        <div class="content">
          <div class="badge">Reference ID: ${payload.submissionId}</div>
          <p>Dear <strong>${payload.authorName}</strong>,</p>
          <p>Thank you for submitting your poster proposal to the <strong>${conferenceName}</strong>. We have successfully logged your submission into the review register.</p>
          
          <div class="summary">
            <p><strong>Poster Title:</strong> ${payload.title}</p>
            <p><strong>Author:</strong> ${payload.authorName}</p>
            <p><strong>Institution:</strong> ${payload.institution}</p>
            <p><strong>Google Drive Poster Link:</strong> <a href="${payload.gdriveLink}" target="_blank" style="color: #A24B27; word-break: break-all;">${payload.gdriveLink}</a></p>
            <p><strong>Submitted At:</strong> ${payload.submittedAt} UTC</p>
          </div>

          <p><strong>Abstract:</strong></p>
          <p style="white-space: pre-wrap; font-size: 13px; color: #5B6865; background: #F7F5F0; padding: 12px; border-radius: 4px; border-left: 3px solid #A24B27;">${payload.abstract}</p>

          <p style="margin-top: 20px; font-size: 12px; color: #5B6865;">
            The Program Committee will evaluate your proposal. If you need to update your poster PDF, simply update your file in Google Drive before the submission deadline (September 30, 2026).
          </p>
        </div>
        <div class="foot">
          DSpace Jubilee Celebration: Governed under Lyrasis
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Email to Admin
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F7F5F0; margin: 0; padding: 24px; color: #12201D; }
        .box { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E4DFD5; border-radius: 6px; overflow: hidden; }
        .head { background: #A24B27; color: #ffffff; padding: 20px 24px; }
        .head h2 { margin: 0 0 4px 0; font-size: 16px; font-weight: 700; }
        .content { padding: 24px; font-size: 13px; line-height: 1.6; color: #2A3835; }
        .table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        .table td { padding: 8px 10px; border-bottom: 1px solid #E4DFD5; }
        .table td.lbl { width: 130px; font-weight: 600; color: #12201D; }
        .abs { background: #F7F5F0; padding: 12px; border-radius: 4px; border-left: 3px solid #A24B27; margin-top: 12px; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="head">
          <h2>New Poster Submission [${payload.submissionId}]</h2>
          <div style="font-size: 12px; opacity: 0.9;">${conferenceName}</div>
        </div>
        <div class="content">
          <table class="table">
            <tr><td class="lbl">Reference ID</td><td><strong>${payload.submissionId}</strong></td></tr>
            <tr><td class="lbl">Poster Title</td><td><strong>${payload.title}</strong></td></tr>
            <tr><td class="lbl">Author</td><td>${payload.authorName}</td></tr>
            <tr><td class="lbl">Email</td><td><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
            <tr><td class="lbl">Institution</td><td>${payload.institution}</td></tr>
            <tr><td class="lbl">Google Drive File</td><td><a href="${payload.gdriveLink}" target="_blank" style="color: #A24B27; font-weight: 600; word-break: break-all;">Open in Google Drive &rarr;</a></td></tr>
            <tr><td class="lbl">Date</td><td>${payload.submittedAt} UTC</td></tr>
          </table>

          <h4 style="margin: 16px 0 6px 0; color: #12201D;">Abstract:</h4>
          <div class="abs">${payload.abstract}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send to Submitter
    const subInfo = await transporter.sendMail({
      from: `"${conferenceName}" <${gmailUser}>`,
      to: payload.email,
      replyTo: adminEmail,
      subject: `[${conferenceName}] Poster Submission Received: Ref ${payload.submissionId}`,
      html: submitterHtml,
    });

    // Send to Admin
    const adminInfo = await transporter.sendMail({
      from: `"${conferenceName} Portal" <${gmailUser}>`,
      to: adminEmail,
      replyTo: payload.email,
      subject: `[Admin Alert] Poster Submission: ${payload.submissionId} - "${payload.title}"`,
      html: adminHtml,
    });

    return {
      success: true,
      messageIdSubmitter: subInfo.messageId,
      messageIdAdmin: adminInfo.messageId,
    };
  } catch (err: any) {
    console.error("[MAILER ERROR]", err?.message || err);
    return {
      success: false,
      error: `Error sending notification email: ${err?.message || "Internal mail service failure"}`,
    };
  }
}
