import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/server";
import { OgImageContent, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Interactive Lab & AI Demos | Giovanni Venditto";
export const size = ogImageSize;
export const contentType = "image/png";

const COPY: Record<Locale, { badge: string; title: string; subtitle: string }> = {
  it: {
    badge: "Playground Interattivo",
    title: "Interactive Lab",
    subtitle: "Demo dal vivo: estrazione OCR + LLM, benchmark AG Grid a 10.000 record e Design System Inspector.",
  },
  en: {
    badge: "Interactive Playground",
    title: "Interactive Lab",
    subtitle: "Live demos: OCR + LLM extraction, 10,000-row AG Grid benchmark, and a Design System Inspector.",
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
    <OgImageContent badge={c.badge} title={c.title} subtitle={c.subtitle} tags={["OCR + LLM", "AG Grid 32", "60fps"]} />,
    { ...ogImageSize }
  );
}
