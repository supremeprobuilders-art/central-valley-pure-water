import type { MetadataRoute } from "next";

import { areaPages } from "./areas/area-data";
import { servicePages } from "./services/service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreUpdated = new Date("2026-08-08");
  const areaUpdated = new Date("2026-08-18");
  return [
    {
      url: "https://www.cvpurewater.com",
      lastModified: areaUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.cvpurewater.com/services",
      lastModified: coreUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages.map((page) => ({
      url: `https://www.cvpurewater.com/services/${page.slug}`,
      lastModified: coreUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: "https://www.cvpurewater.com/call-for-pricing",
      lastModified: coreUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.cvpurewater.com/areas",
      lastModified: areaUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...areaPages.map((page) => ({
      url: `https://www.cvpurewater.com/areas/${page.slug}`,
      lastModified: areaUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
