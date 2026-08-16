import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { areaPageBySlug, areaPages } from "../area-data";
import { AreaPageView } from "../area-page-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return areaPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = areaPageBySlug[slug];
  if (!page) return {};

  const path = `/areas/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      url: path,
      images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: `Water treatment system installation in ${page.city}` }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription, images: ["/cvpurewater-hero.webp"] },
  };
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = areaPageBySlug[slug];
  if (!page) notFound();
  return <AreaPageView page={page} />;
}
