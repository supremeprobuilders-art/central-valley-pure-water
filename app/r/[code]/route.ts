import { NextResponse } from "next/server";

const CODE_PATTERN = /^[a-z0-9][a-z0-9-]{1,39}$/i;

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await context.params;
  const code = rawCode.trim().toLowerCase();
  const destination = new URL("/water-check", request.url);

  if (!CODE_PATTERN.test(code)) {
    return NextResponse.redirect(destination, 302);
  }

  destination.searchParams.set("ref", code);
  destination.searchParams.set("utm_source", "partner");
  destination.searchParams.set("utm_medium", "referral");
  destination.searchParams.set("utm_campaign", "cvpw_partner_network");

  const response = NextResponse.redirect(destination, 302);

  response.cookies.set("cvpw_ref", code, {
    httpOnly: true,
    sameSite: "lax",
    secure: destination.protocol === "https:",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
