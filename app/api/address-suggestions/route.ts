import { sitesBackendOrigin } from "../../site-config";

export async function GET(request: Request) {
  const sourceUrl = new URL(request.url);
  const upstreamUrl = new URL("/api/address-suggestions", sitesBackendOrigin);
  upstreamUrl.search = sourceUrl.search;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return Response.json({ suggestions: [] }, { status: 503 });
  }
}
