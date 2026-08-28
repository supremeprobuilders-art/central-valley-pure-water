const approvedWaterCheckBackend =
  "https://central-valley-pure-water.supreme-pro-2342.chatgpt.site";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${approvedWaterCheckBackend}/api/water-leads`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
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
    return Response.json(
      {
        error:
          "We could not save your match right now. Please try again or call (510) 725-5120.",
      },
      { status: 503 },
    );
  }
}
