import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cvpurewater.com",
      lastModified: new Date("2026-07-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
