import { NextResponse } from "next/server";
import { verifyMailConfig } from "@/lib/mailer";

export async function GET() {
  try {
    const status = await verifyMailConfig();
    return NextResponse.json(status, {
      status: status.verified || status.simulated ? 200 : 500,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        configured: false,
        simulated: false,
        verified: false,
        message: `Diagnostic check failed: ${err?.message || "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
