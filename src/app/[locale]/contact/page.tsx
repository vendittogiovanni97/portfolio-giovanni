import { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const COPY: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  it: {
    title: "Contatto & Prenota una Call",
    description:
      "Parliamo del tuo progetto, della fattibilità tecnica o prenota una call conoscitiva di 30 minuti su Calendly con Giovanni Venditto.",
    ogTitle: "Contatta Giovanni Venditto | Fullstack & AI-Ready Engineer",
    ogDescription:
      "Hai un progetto web o un'automazione AI da realizzare? Prenota 30 minuti su Calendly o invia un messaggio diretto.",
  },
  en: {
    title: "Contact & Book a Call",
    description:
      "Let's talk about your project, technical feasibility, or book a free 30-minute intro call on Calendly with Giovanni Venditto.",
    ogTitle: "Contact Giovanni Venditto | Fullstack & AI-Ready Engineer",
    ogDescription:
      "Have a web project or an AI automation to build? Book 30 minutes on Calendly or send a direct message.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const c = COPY[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: localeAlternates(locale, "/contact"),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
    },
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactContent />
      </div>
    </div>
  );
}
