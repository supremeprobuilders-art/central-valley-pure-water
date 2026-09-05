import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/water-report",
          has: [
            { type: "query", key: "zip", value: "(?<guardedZip>95356)" },
            { type: "query", key: "lat", value: "(?<guardedLat>-?[0-9]+(?:\\.[0-9]+)?)" },
            { type: "query", key: "lon", value: "(?<guardedLon>-?[0-9]+(?:\\.[0-9]+)?)" },
          ],
          destination:
            "/api/verified-water-report?zip=:guardedZip&lat=:guardedLat&lon=:guardedLon",
        },
        {
          source: "/api/water-report",
          has: [{ type: "query", key: "zip", value: "(?<guardedZip>95356)" }],
          missing: [
            { type: "query", key: "lat" },
            { type: "query", key: "lon" },
          ],
          destination: "/api/verified-water-report?zip=:guardedZip",
        },
        {
          source: "/api/water-report",
          has: [
            {
              type: "query",
              key: "zip",
              value: "(?<guardedZip>95352|95353|95397)",
            },
          ],
          missing: [
            { type: "query", key: "lat" },
            { type: "query", key: "lon" },
          ],
          destination: "/api/verified-water-report?zip=:guardedZip",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
