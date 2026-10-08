import { Metadata } from "next";
import { LabContent } from "@/components/lab/LabContent";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const COPY: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  it: {
    title: "Lab Interattivo & Demo AI",
    description:
      "Prova demo interattive: simulazione OCR con dati mock, generazione e filtro di una tabella HTML fino a 10.000 record e Design System Inspector.",
    ogTitle: "Interactive Lab & AI Demos | Giovanni Venditto",
    ogDescription:
      "Demo browser con simulazione OCR, dati di prova e una tabella HTML filtrabile.",
  },
  en: {
    title: "Interactive Lab & AI Demos",
    description:
      "Try interactive demos: simulated OCR with mock data, generation and filtering of an HTML table with up to 10,000 records, and a Design System Inspector.",
    ogTitle: "Interactive Lab & AI Demos | Giovanni Venditto",
    ogDescription:
      "Browser demos featuring simulated OCR, sample data, and a filterable HTML table.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const c = COPY[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: localeAlternates(locale, "/lab"),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
    },
  };
}

export default function LabPage() {
  return <LabContent />;
}
