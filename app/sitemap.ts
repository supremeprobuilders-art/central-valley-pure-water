import type { MetadataRoute } from "next";

import { servicePages } from "./services/service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-08");
  return [
    {
      url: "https://www.cvpurewater.com",
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.cvpurewater.com/services",
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages.map((page) => ({
      url: `https://www.cvpurewater.com/services/${page.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: "https://www.cvpurewater.com/call-for-pricing",
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
