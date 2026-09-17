import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/server";
import { OgImageContent, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "About Me & Background | Giovanni Venditto";
export const size = ogImageSize;
export const contentType = "image/png";

const COPY: Record<Locale, { badge: string; title: string; subtitle: string }> = {
  it: {
    badge: "Percorso Studi & Formazione",
    title: "Chi Sono",
    subtitle: "Il mio percorso accademico, l'esperienza in Agilae e le certificazioni ufficiali Anthropic Claude.",
  },
  en: {
    badge: "Education & Studies",
    title: "About Me",
    subtitle: "My academic path, my experience at Agilae, and my official Anthropic Claude certifications.",
  },
};

interface ImageProps {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const c = COPY[locale];

  return new ImageResponse(
    <OgImageContent badge={c.badge} title={c.title} subtitle={c.subtitle} tags={["React 19", "Node.js", "Anthropic Claude"]} />,
    { ...ogImageSize }
  );
}
