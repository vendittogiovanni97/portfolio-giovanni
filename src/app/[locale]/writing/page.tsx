import type { Metadata } from "next";
import { getAllWritingPosts } from "@/lib/writing";
import { WritingList } from "@/components/writing/WritingList";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const copy = locale === "it"
    ? { title: "Articoli", description: "Appunti su prodotti, interfacce e ingegneria software." }
    : { title: "Writing", description: "Notes on products, interfaces, and software engineering." };

  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates(locale, "/writing"),
    openGraph: { type: "website", title: copy.title, description: copy.description },
  };
}

export default async function WritingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  return <WritingList posts={getAllWritingPosts(locale)} locale={locale} />;
}
