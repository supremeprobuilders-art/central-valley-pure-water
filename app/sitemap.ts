import type { MetadataRoute } from "next";

import { areaPages } from "./areas/area-data";
import { servicePages } from "./services/service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreUpdated = new Date("2026-08-08");
  const areaUpdated = new Date("2026-08-28");
  const waterCheckUpdated = new Date("2026-08-20");
  const growthUpdated = new Date("2026-08-22");
  return [
    {
      url: "https://www.cvpurewater.com",
      lastModified: growthUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.cvpurewater.com/water-check",
      lastModified: waterCheckUpdated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://www.cvpurewater.com/financing",
      lastModified: growthUpdated,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://www.cvpurewater.com/partners",
      lastModified: growthUpdated,
      changeFrequency: "monthly",
      priority: 0.75,
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
