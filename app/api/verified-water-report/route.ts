import { guardedZipReport } from "../../water-check/verified-zip-safeguards";

export async function GET(request: Request) {
  const zip = new URL(request.url).searchParams.get("zip")?.trim() ?? "";
  const report = guardedZipReport(zip);

  if (!report) {
    return Response.json(
      { error: "No verified ZIP safeguard is configured for this request." },
      { status: 404 },
    );
  }

  return Response.json(report, {
    headers: { "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
