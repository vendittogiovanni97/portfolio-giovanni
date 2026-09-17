import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/server";
import { OgImageContent, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Contact Giovanni Venditto | Fullstack & AI-Ready Engineer";
export const size = ogImageSize;
export const contentType = "image/png";

const COPY: Record<Locale, { badge: string; title: string; subtitle: string }> = {
  it: {
    badge: "Prenota una Call · 30 Min",
    title: "Contattami",
    subtitle: "Parliamo del tuo progetto web o della tua automazione AI. Rispondo di solito entro 24 ore.",
  },
  en: {
    badge: "Book a Call · 30 Min",
    title: "Contact Me",
    subtitle: "Let's talk about your web project or AI automation. I usually reply within 24 hours.",
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
    <OgImageContent badge={c.badge} title={c.title} subtitle={c.subtitle} tags={["Fullstack", "AI Automation", "Consulting"]} />,
    { ...ogImageSize }
  );
}
