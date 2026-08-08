import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { servicePageBySlug, servicePages } from "../service-data";
import { ServicePageView } from "../service-page-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageBySlug[slug];
  if (!page) return {};

  const path = `/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      url: path,
      images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: `${page.shortTitle} from Central Valley Pure Water` }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription, images: ["/cvpurewater-hero.webp"] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePageBySlug[slug];
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
