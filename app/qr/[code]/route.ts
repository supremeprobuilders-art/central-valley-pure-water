import QRCode from "qrcode";

const CODE_PATTERN = /^[a-z0-9][a-z0-9-]{1,39}$/i;

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await context.params;
  const code = rawCode.trim().toLowerCase();

  if (!CODE_PATTERN.test(code)) {
    return new Response("Invalid referral code", { status: 400 });
  }

  const requestUrl = new URL(request.url);
  const referralUrl = `${requestUrl.origin}/r/${encodeURIComponent(code)}`;
  const svg = await QRCode.toString(referralUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 640,
    color: {
      dark: "#0E2B3D",
      light: "#FFFFFF",
    },
  });

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `inline; filename="cvpurewater-${code}-qr.svg"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
