import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/signin-with-chatgpt", "/signout-with-chatgpt", "/callback"],
    },
    sitemap: "https://www.cvpurewater.com/sitemap.xml",
    host: "https://www.cvpurewater.com",
  };
}
