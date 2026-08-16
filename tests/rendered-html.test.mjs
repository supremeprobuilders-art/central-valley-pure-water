import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders production homepage metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/www\.cvpurewater\.com\/?["']/i);
  assert.match(html, /Water Softeners &amp; Reverse Osmosis \| Central Valley Pure Water/i);
  assert.match(html, /"@type":"LocalBusiness"/i);
});

test("renders the service-area hub and static city pages with SEO signals", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("area-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = ["/areas", "/areas/modesto", "/areas/stockton", "/areas/tracy", "/areas/manteca", "/areas/turlock"];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();

    assert.equal(response.status, 200, `${route} should render`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(html, new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']https:\\/\\/www\\.cvpurewater\\.com${route.replaceAll("/", "\\/")}["']`, "i"));
    assert.match(html, /tel:\+15107255120/i);
    assert.match(html, /application\/ld\+json/i);
  }
});
