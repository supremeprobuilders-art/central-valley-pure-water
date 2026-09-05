import assert from "node:assert/strict";
import test from "node:test";
import verifiedWaterSystems from "../app/water-check/verified-water-systems.json" with { type: "json" };

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
    assert.match(html, /href=["']\/financing["']/i);
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

  const tracyResponse = await worker.fetch(
    new Request("http://localhost/areas/tracy", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const tracyHtml = await tracyResponse.text();
  assert.match(tracyHtml, /Free Tracy Water Report &amp; Installed System Prices/i);
  assert.match(tracyHtml, /Why Tracy(?:’|&#x2019;)s changing water sources matter/i);
  assert.match(tracyHtml, /39% from the Delta-Mendota Canal/i);
  assert.match(tracyHtml, /56% from the Stanislaus River/i);
  assert.match(tracyHtml, /31\.0 mg\/L for South San Joaquin Irrigation District treated surface water/i);
  assert.match(tracyHtml, /264 mg\/L well-water average/i);
  assert.match(tracyHtml, /not a laboratory test of water from your tap/i);
  assert.match(tracyHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(tracyHtml, /href=["']\/water-check\?zip=95376["']/i);
  assert.match(tracyHtml, /href=["']\/financing["']/i);
  assert.match(tracyHtml, /City of Tracy 2025 Water Quality Report/i);
  assert.match(tracyHtml, /dateModified[^}]+2026-08-31/i);
  assert.doesNotMatch(tracyHtml, /Free Modesto Water Report/i);

  const mantecaResponse = await worker.fetch(
    new Request("http://localhost/areas/manteca", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const mantecaHtml = await mantecaResponse.text();
  assert.match(mantecaHtml, /Free Manteca Water Report &amp; Installed System Prices/i);
  assert.match(mantecaHtml, /Start with Manteca(?:’|&#x2019;)s provider and mixed water sources/i);
  assert.match(mantecaHtml, /active public water system CA3910005/i);
  assert.match(mantecaHtml, /approximately 50% City groundwater and 50% purchased surface water/i);
  assert.match(mantecaHtml, /not a laboratory test of water from your tap/i);
  assert.match(mantecaHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(mantecaHtml, /href=["']\/water-check\?zip=95337["']/i);
  assert.match(mantecaHtml, /href=["']\/financing["']/i);
  assert.match(mantecaHtml, /California Drinking Water Watch/i);
  assert.match(mantecaHtml, /dateModified[^}]+2026-09-01/i);
  assert.doesNotMatch(mantecaHtml, /Free Modesto Water Report/i);

  const turlockResponse = await worker.fetch(
    new Request("http://localhost/areas/turlock", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const turlockHtml = await turlockResponse.text();
  assert.match(turlockHtml, /Free Turlock Water Report &amp; Installed System Prices/i);
  assert.match(turlockHtml, /Confirm Turlock city water or a private well first/i);
  assert.match(turlockHtml, /active public water system CA5010019/i);
  assert.match(turlockHtml, /14 active well facilities plus purchased treated surface water/i);
  assert.match(turlockHtml, /2025 report and certification as not available/i);
  assert.match(turlockHtml, /not a laboratory test of water from your tap/i);
  assert.match(turlockHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(turlockHtml, /href=["']\/water-check\?zip=95380["']/i);
  assert.match(turlockHtml, /href=["']\/financing["']/i);
  assert.match(turlockHtml, /City of Turlock Water Quality Annual Reports/i);
  assert.match(turlockHtml, /dateModified[^}]+2026-09-02/i);
  assert.doesNotMatch(turlockHtml, /Free Modesto Water Report/i);

  const sacramentoResponse = await worker.fetch(
    new Request("http://localhost/areas/sacramento", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const sacramentoHtml = await sacramentoResponse.text();
  assert.match(sacramentoHtml, /Free Sacramento Water Report &amp; Installed System Prices/i);
  assert.match(sacramentoHtml, /Start with the Sacramento provider—not a citywide assumption/i);
  assert.match(sacramentoHtml, /active public water system CA3410020/i);
  assert.match(sacramentoHtml, /about 80% from the American and Sacramento rivers and about 20% from groundwater wells/i);
  assert.match(sacramentoHtml, /system-average hardness of 83 mg\/L/i);
  assert.match(sacramentoHtml, /not a laboratory test of water from your tap/i);
  assert.match(sacramentoHtml, /Standard \$3,495, Standard Plus \$3,995, or Dual Tank Full \$5,495 installed/i);
  assert.match(sacramentoHtml, /href=["']\/water-check\?zip=95814["']/i);
  assert.match(sacramentoHtml, /href=["']\/financing["']/i);
  assert.match(sacramentoHtml, /City of Sacramento Water Purveyor Map/i);
  assert.match(sacramentoHtml, /dateModified[^}]+2026-09-04/i);
  assert.doesNotMatch(sacramentoHtml, /Free Modesto Water Report/i);
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

test("requires address verification for non-geographic Modesto postal ZIPs", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("postal-zip-guard-test", `${process.pid}-${Date.now()}`);
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

  for (const zip of ["95352", "95353", "95397"]) {
    const response = await worker.fetch(
      new Request(`http://localhost/api/water-report?zip=${zip}`, {
        headers: { accept: "application/json" },
      }),
      environment,
      executionContext,
    );
    const report = await response.json();

    assert.equal(response.status, 200, `${zip} should return a safe report`);
    assert.equal(report.zip, zip);
    assert.equal(report.location.city, "Modesto");
    assert.deepEqual(report.providers, []);
    assert.equal(report.privateWellPath, true);
    assert.equal(report.addressVerificationRequired, true);
    assert.match(report.verificationReason, /no Census ZIP-area polygon/i);
    assert.match(report.verificationReason, /rural or private-well path/i);
  }
});

test("requires an exact address for ZIP 95356 and records every verified system", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("95356-guard-test", `${process.pid}-${Date.now()}`);
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

  const response = await worker.fetch(
    new Request("http://localhost/api/water-report?zip=95356", {
      headers: { accept: "application/json" },
    }),
    environment,
    executionContext,
  );
  const report = await response.json();

  assert.equal(response.status, 200);
  assert.equal(report.zip, "95356");
  assert.equal(report.location.city, "Modesto");
  assert.deepEqual(report.providers, []);
  assert.equal(report.privateWellPath, true);
  assert.equal(report.addressVerificationRequired, true);
  assert.match(report.verificationReason, /multiple public-water systems/i);
  assert.match(report.verificationReason, /rural or private-well properties/i);

  const expectedSystems = {
    CA5010010: ["City of Modesto", "5556"],
    CA3910003: ["City of Escalon", "4017"],
    CA5010029: ["City of Modesto – Del Rio", "5573"],
    CA5000263: ["Oasis Investments", "7375"],
    CA5000067: ["Tully Mobile Estates", "7334"],
    CA5010005: ["City of Modesto – Salida", "5551"],
    CA5000099: ["Del Rio East HOA Water System", "7349"],
    CA5000562: ["Los Indios Water System", "7299"],
  };

  for (const [pwsId, [name, stateKey]] of Object.entries(expectedSystems)) {
    const system = verifiedWaterSystems[pwsId];
    assert.equal(system.name, name);
    assert.ok(system.source.length > 0);
    assert.match(system.officialReportUrl, new RegExp(`tinwsys_is_number=${stateKey}.*wsnumber=${pwsId}`));
  }
  assert.equal(verifiedWaterSystems.CA5000099.utilityReportUrl, undefined);
  assert.equal(verifiedWaterSystems.CA5000562.utilityReportUrl, undefined);
});
