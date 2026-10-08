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
    subtitle: "Demo browser: simulazione OCR con dati mock, tabella HTML filtrabile e Design System Inspector.",
  },
  en: {
    badge: "Interactive Playground",
    title: "Interactive Lab",
    subtitle: "Browser demos: simulated OCR with mock data, a filterable HTML table, and a Design System Inspector.",
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
    <OgImageContent badge={c.badge} title={c.title} subtitle={c.subtitle} tags={["OCR mock", "HTML table", "UI inspector"]} />,
    { ...ogImageSize }
  );
}
