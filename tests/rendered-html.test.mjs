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
  assert.match(html, /Free Water Report \+ Installed Prices \| Central Valley Pure Water/i);
  assert.match(html, /"@type":"LocalBusiness"/i);
  assert.match(html, /href=["']https:\/\/www\.formadesignconsultants\.com\/["']/i);
  assert.match(html, /href=["']https:\/\/supremeprobuilders\.com\/["']/i);
  assert.match(html, /\/partners\/forma-design-consultants\.webp/i);
  assert.match(html, /\/partners\/supreme-pro-builders\.webp/i);
  assert.match(html, /href=["']\/water-check["']/i);
  assert.match(html, /Free California water check/i);
  assert.match(html, /without signing up or speaking to a sales rep first/i);
  assert.match(html, /One ZIP\. Three/i);
  assert.match(html, /Standard \$3,495, Standard Plus \$3,995, and Dual Tank Full \$5,495/i);
  assert.match(html, /href=["']\/areas\/merced["']/i);
});

test("renders the service-area hub and static city pages with SEO signals", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("area-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = ["/areas", "/areas/modesto", "/areas/stockton", "/areas/tracy", "/areas/manteca", "/areas/turlock", "/areas/sacramento", "/areas/elk-grove", "/areas/merced"];

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

  const modestoResponse = await worker.fetch(
    new Request("http://localhost/areas/modesto", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const modestoHtml = await modestoResponse.text();
  assert.match(modestoHtml, /Free Modesto Water Report &amp; Installed System Prices/i);
  assert.match(modestoHtml, /Modesto System 5010010/i);
  assert.match(modestoHtml, /40% groundwater and 60% surface water/i);
  assert.match(modestoHtml, /average hardness of 199 parts per million/i);
  assert.match(modestoHtml, /not a laboratory test of water from your tap/i);
  assert.match(modestoHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(modestoHtml, /href=["']\/water-check\?zip=95351["']/i);
  assert.match(modestoHtml, /href=["']\/financing["']/i);
  assert.match(modestoHtml, /City of Modesto 2025 Consumer Confidence Report/i);

  const stocktonResponse = await worker.fetch(
    new Request("http://localhost/areas/stockton", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const stocktonHtml = await stocktonResponse.text();
  assert.match(stocktonHtml, /Free Stockton Water Report &amp; Installed System Prices/i);
  assert.match(stocktonHtml, /Start with the provider—not a citywide assumption/i);
  assert.match(stocktonHtml, /23,926 tests on 3,432 samples for 237 constituents/i);
  assert.match(stocktonHtml, /150 ppm average groundwater hardness/i);
  assert.match(stocktonHtml, /not a laboratory test of water from a Stockton faucet/i);
  assert.match(stocktonHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(stocktonHtml, /href=["']\/water-check\?zip=95205["']/i);
  assert.match(stocktonHtml, /href=["']\/financing["']/i);
  assert.match(stocktonHtml, /Cal Water Stockton 2025 Water Quality Report/i);
  assert.match(stocktonHtml, /Free Stockton Water Report/i);
  assert.doesNotMatch(stocktonHtml, /Free Modesto Water Report/i);
});


test("renders the protected approved Water Check funnel", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("water-check-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/water-check", {
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
  assert.match(html, /What(?:'|&#x27;)s in your water\?/i);
  assert.match(html, /See the full report/i);
  assert.match(html, /Show my water results/i);
  assert.match(html, /Free · No signup · Utility data first/i);
  assert.match(html, /We match the utility/i);
  assert.match(html, /Every result stays here/i);
  assert.match(html, /Size the home and save the result/i);
  assert.doesNotMatch(html, /Check your water\. See the math\. Get your price/i);
  assert.match(html, /"@type":"WebApplication"/i);
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
