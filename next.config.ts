import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
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
