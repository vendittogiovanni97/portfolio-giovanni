import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/server";
import { OgImageContent, ogImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Giovanni Venditto | Fullstack & AI-Ready Engineer";
export const size = ogImageSize;
export const contentType = "image/png";

const COPY: Record<Locale, { badge: string; subtitle: string }> = {
  it: {
    badge: "Formazione Ufficiale Anthropic Claude · Fullstack & AI-Ready",
    subtitle: "Fullstack Engineer · React 19, Next.js 16, Node.js & Automazioni AI",
  },
  en: {
    badge: "Official Anthropic Claude Training · Fullstack & AI-Ready",
    subtitle: "Fullstack Engineer · React 19, Next.js 16, Node.js & AI Automations",
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
    (
      <OgImageContent
        badge={c.badge}
        title="GIOVANNI"
        titleAccent="VENDITTO"
        subtitle={c.subtitle}
        tags={["Next.js 16", "React 19", "Node.js", "Anthropic Claude", "AI Process Automation"]}
      />
    ),
    { ...ogImageSize }
  );
}
