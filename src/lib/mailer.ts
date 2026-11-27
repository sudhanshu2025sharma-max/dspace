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

export interface MailDeliveryDetails {
  submitterEmail: string;
  submitterDelivered: boolean;
  adminEmail: string;
  adminDelivered: boolean;
  simulated?: boolean;
  messageIdSubmitter?: string;
  messageIdAdmin?: string;
}

export interface MailResult {
  success: boolean;
  messageIdAdmin?: string;
  messageIdSubmitter?: string;
  error?: string;
  errorType?: "AUTH_FAILED" | "CONFIG_MISSING" | "TIMEOUT" | "SEND_FAILED";
  simulated?: boolean;
  details?: MailDeliveryDetails;
}

export interface MailConfigStatus {
  configured: boolean;
  simulated: boolean;
  verified: boolean;
  user?: string;
  admin?: string;
  message: string;
  warning?: string;
}

/**
 * Sanitizes and validates environment configuration for Gmail SMTP.
 * Auto-corrects common copy-paste artifacts like 'your-foo@gmail.com' or 'admin-bar@gmail.com'.
 */
export function getSanitizedMailConfig() {
  const rawUser = process.env.GMAIL_USER?.trim() || "";
  const rawPass = process.env.GMAIL_APP_PASSWORD?.trim() || "";
  const rawAdmin = process.env.ADMIN_EMAIL?.trim() || "";
  const conferenceName =
    process.env.CONFERENCE_NAME?.trim() ||
    "Celebration of Silver Jubilee of DSpace in IIIC 2026, IGNOU";

  // Check if unconfigured or default placeholders
  const isUserPlaceholder =
    !rawUser || rawUser.toLowerCase() === "your-conference-email@gmail.com";
  const isPassPlaceholder =
    !rawPass ||
    rawPass.toLowerCase() === "xxxx xxxx xxxx xxxx" ||
    rawPass.toLowerCase() === "xxxxxxxxxxxxxxxx";

  if (isUserPlaceholder || isPassPlaceholder) {
    return {
      configured: false,
      reason:
        "GMAIL_USER or GMAIL_APP_PASSWORD is not configured in .env.local. Running in simulation mode.",
      user: "",
      pass: "",
      admin: "",
      adminEmails: [] as string[],
      conferenceName,
      warning: undefined,
    };
  }

  // Auto-clean accidental 'your-' prefix (e.g., your-sudhanshu2025sharma@gmail.com -> sudhanshu2025sharma@gmail.com)
  let user = rawUser;
  let warning: string | undefined = undefined;

  if (user.toLowerCase().startsWith("your-") && user.includes("@")) {
    const cleaned = user.replace(/^your-/i, "");
    console.warn(
      `[MAILER] Auto-sanitized GMAIL_USER from '${user}' to '${cleaned}'. Update your .env.local to remove 'your-'.`
    );
    user = cleaned;
    warning = "Auto-corrected 'your-' prefix from GMAIL_USER.";
  }

  // Support multiple comma-separated admin emails & auto-clean accidental 'admin-' prefix
  const parsedAdmins = (rawAdmin || user)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      if (entry.toLowerCase().startsWith("admin-") && entry.includes("@")) {
        const cleaned = entry.replace(/^admin-/i, "");
        console.warn(
          `[MAILER] Auto-sanitized ADMIN_EMAIL from '${entry}' to '${cleaned}'. Update your .env.local to remove 'admin-'.`
        );
        return cleaned;
      }
      return entry;
    });

  const adminEmails = parsedAdmins.length > 0 ? Array.from(new Set(parsedAdmins)) : [user];
  const admin = adminEmails.join(", ");

  // Remove whitespace from 16-character Google App Password
  const pass = rawPass.replace(/\s+/g, "");

  return {
    configured: true,
    user,
    pass,
    admin,
    adminEmails,
    conferenceName,
    warning,
  };
}

/**
 * Creates a configured Nodemailer transporter with connection timeouts
 */
export function createMailTransporter() {
  const config = getSanitizedMailConfig();
  if (!config.configured) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Prevent request hanging indefinitely on network/proxy latency
    connectionTimeout: 10000, // 10s
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Verifies email configuration and tests SMTP connectivity
 */
export async function verifyMailConfig(): Promise<MailConfigStatus> {
  const config = getSanitizedMailConfig();

  if (!config.configured) {
    return {
      configured: false,
      simulated: true,
      verified: false,
      message:
        "Email credentials not yet set in .env.local. The application is running in local simulation mode (submissions will succeed without sending real emails).",
    };
  }

  // Validate Google App Password length check (Google App Passwords are 16 letters)
  if (config.pass.length !== 16) {
    return {
      configured: true,
      simulated: false,
      verified: false,
      user: config.user,
      admin: config.admin,
      warning: config.warning,
      message: `Invalid Google App Password length (${config.pass.length} chars). A valid Google App Password consists of exactly 16 letters without spaces (e.g., 'yxksszxuvivwbdrd'). Ensure 2-Step Verification is active and generate an App Password at https://myaccount.google.com/apppasswords.`,
    };
  }

  const transporter = createMailTransporter();
  if (!transporter) {
    return {
      configured: false,
      simulated: true,
      verified: false,
      message: "Could not initialize mail transporter.",
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      simulated: false,
      verified: true,
      user: config.user,
      admin: config.admin,
      warning: config.warning,
      message: `Gmail SMTP service successfully verified and authenticated for ${config.user}.`,
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.error("[MAILER VERIFY ERROR]", errorMsg);

    let friendly = `Gmail SMTP connection check failed: ${errorMsg}`;
    if (errorMsg.includes("535") || errorMsg.includes("Username and Password not accepted") || err?.code === "EAUTH") {
      friendly = `Gmail Authentication Failed (535 5.7.8): Google rejected the username or App Password for '${config.user}'.\n• Verify Google 2-Step Verification is turned ON.\n• Generate a new 16-character App Password at https://myaccount.google.com/apppasswords.\n• Ensure GMAIL_USER in .env.local is exactly your Google account without extra prefixes.`;
    } else if (err?.code === "ETIMEDOUT" || err?.code === "ESOCKET" || errorMsg.includes("timeout")) {
      friendly = `Connection to Gmail SMTP timed out. Please check your network connection or firewall settings.`;
    }

    return {
      configured: true,
      simulated: false,
      verified: false,
      user: config.user,
      admin: config.admin,
      warning: config.warning,
      message: friendly,
    };
  }
}

/**
 * Sends confirmation email to submitter and alert dossier to conference admin.
 */
export async function sendSubmissionEmails(
  payload: SimpleSubmissionPayload
): Promise<MailResult> {
  const config = getSanitizedMailConfig();

  // If credentials are not configured, operate safely in simulation mode
  if (!config.configured) {
    console.warn(
      `[MAILER] Email credentials not configured. Proposal [${payload.submissionId}] logged in simulation mode.`
    );
    return {
      success: true,
      simulated: true,
      details: {
        submitterEmail: payload.email,
        submitterDelivered: false,
        adminEmail: config.admin || "unconfigured@local",
        adminDelivered: false,
        simulated: true,
      },
      error:
        "Submission received in local simulation mode. Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local to dispatch real emails.",
    };
  }

  const transporter = createMailTransporter();
  if (!transporter) {
    return {
      success: false,
      errorType: "CONFIG_MISSING",
      error: "Unable to create mail transporter. Please check your configuration.",
    };
  }

  // 1. Prepare HTML template for Submitter
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
          <h1>${config.conferenceName}</h1>
          <p>Jubilee Celebration: Poster Submission Acknowledgment</p>
        </div>
        <div class="content">
          <div class="badge">Reference ID: ${payload.submissionId}</div>
          <p>Dear <strong>${payload.authorName}</strong>,</p>
          <p>Thank you for submitting your poster proposal to the <strong>${config.conferenceName}</strong>. We have successfully logged your submission into the review register.</p>
          
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
            The Program Committee will evaluate your proposal. If you need to update your poster PDF, simply update your file in Google Drive before the submission deadline (December 20, 2026).
          </p>
        </div>
        <div class="foot">
          Celebration of Silver Jubilee of DSpace in IIIC 2026, IGNOU: Governed under Lyrasis
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Prepare HTML template for Admin
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
          <div style="font-size: 12px; opacity: 0.9;">${config.conferenceName}</div>
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
    // Dispatch Submitter Email
    const subInfo = await transporter.sendMail({
      from: `"${config.conferenceName}" <${config.user}>`,
      to: payload.email,
      replyTo: config.adminEmails[0] || config.user,
      subject: `[${config.conferenceName}] Poster Submission Received: Ref ${payload.submissionId}`,
      html: submitterHtml,
    });

    // Dispatch Admin Notification Email to all configured admin recipients
    let adminInfoMessageId: string | undefined = undefined;
    try {
      const adminInfo = await transporter.sendMail({
        from: `"${config.conferenceName} Portal" <${config.user}>`,
        to: config.adminEmails,
        replyTo: payload.email,
        subject: `[Admin Alert] Poster Submission: ${payload.submissionId} - "${payload.title}"`,
        html: adminHtml,
      });
      adminInfoMessageId = adminInfo.messageId;
    } catch (adminErr: any) {
      console.error("[MAILER ADMIN DISPATCH ERROR]", adminErr?.message || adminErr);
      // We still acknowledge the submitter succeeded, but report admin notice failed
    }

    return {
      success: true,
      simulated: false,
      messageIdSubmitter: subInfo.messageId,
      messageIdAdmin: adminInfoMessageId,
      details: {
        submitterEmail: payload.email,
        submitterDelivered: true,
        adminEmail: config.admin,
        adminDelivered: Boolean(adminInfoMessageId),
        simulated: false,
        messageIdSubmitter: subInfo.messageId,
        messageIdAdmin: adminInfoMessageId,
      },
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.error("[MAILER SEND ERROR]", errorMsg);

    let friendly = `Failed to send email notifications: ${errorMsg}`;
    let errorType: MailResult["errorType"] = "SEND_FAILED";

    if (errorMsg.includes("535") || errorMsg.includes("Username and Password not accepted") || err?.code === "EAUTH") {
      errorType = "AUTH_FAILED";
      friendly = `Gmail SMTP Authentication Failed (535 5.7.8): Google rejected the App Password or email address for '${config.user}'.\n\nFix steps:\n1. Enable 2-Step Verification at https://myaccount.google.com/security\n2. Generate a 16-character App Password at https://myaccount.google.com/apppasswords\n3. Ensure GMAIL_USER in .env.local is '${config.user}' (without extra prefixes)\n4. Restart the development server so changes take effect.`;
    } else if (err?.code === "ETIMEDOUT" || err?.code === "ESOCKET" || errorMsg.includes("timeout")) {
      errorType = "TIMEOUT";
      friendly = `Connection to Gmail SMTP timed out. Please verify network connectivity.`;
    }

    return {
      success: false,
      errorType,
      error: friendly,
      details: {
        submitterEmail: payload.email,
        submitterDelivered: false,
        adminEmail: config.admin,
        adminDelivered: false,
        simulated: false,
      },
    };
  }
}
