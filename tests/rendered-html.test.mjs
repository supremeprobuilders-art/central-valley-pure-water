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
  assert.match(html, /href=["']https:\/\/www\.formadesignconsultants\.com\/["']/i);
  assert.match(html, /href=["']https:\/\/supremeprobuilders\.com\/["']/i);
  assert.match(html, /\/partners\/forma-design-consultants\.webp/i);
  assert.match(html, /\/partners\/supreme-pro-builders\.webp/i);
  assert.match(html, /href=["']\/water-check["']/i);
  assert.match(html, /Free California water check/i);
});

test("renders the service-area hub and static city pages with SEO signals", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("area-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = ["/areas", "/areas/modesto", "/areas/stockton", "/areas/tracy", "/areas/manteca", "/areas/turlock", "/areas/sacramento", "/areas/elk-grove"];

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


test("renders the free California water check with canonical trust signals", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("water-check-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/water-check?zip=95351", {
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
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/www\.cvpurewater\.com\/water-check["']/i,
  );
  assert.match(html, /Free California Water Check by ZIP/i);
  assert.match(html, /No email/i);
  assert.match(html, /No signup/i);
  assert.match(html, /area-level public-record lookup/i);
  assert.match(html, /"@type":"WebApplication"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /tel:\+15107255120/i);
  assert.doesNotMatch(html, /<input[^>]+type=["']email["']/i);
});

test("validates water-check API inputs before calling upstream sources", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("water-check-api-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const environment = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const executionContext = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const outsideCalifornia = await worker.fetch(
    new Request("http://localhost/api/water-check?zip=10001", {
      headers: { accept: "application/json" },
    }),
    environment,
    executionContext,
  );
  assert.equal(outsideCalifornia.status, 400);
  assert.match(outsideCalifornia.headers.get("content-type") ?? "", /^application\/json\b/i);
  assert.equal((await outsideCalifornia.json()).error.code, "OUTSIDE_CALIFORNIA");

  const invalidSystem = await worker.fetch(
    new Request("http://localhost/api/water-check?pws=not-valid", {
      headers: { accept: "application/json" },
    }),
    environment,
    executionContext,
  );
  assert.equal(invalidSystem.status, 400);
  assert.equal((await invalidSystem.json()).error.code, "INVALID_SYSTEM");
});
