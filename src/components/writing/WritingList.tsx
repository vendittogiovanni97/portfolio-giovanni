import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/server";
import type { WritingPost } from "@/lib/writing";

const COPY = {
  it: {
    eyebrow: "NOTE & ARTICOLI TECNICI",
    title: "Idee messe alla prova.",
    intro: "Appunti su prodotti, interfacce reattive e sistemi software costruiti per risolvere problemi reali.",
    count: "ARTICOLI",
    read: "Leggi Articolo",
  },
  en: {
    eyebrow: "TECHNICAL NOTES & ESSAYS",
    title: "Ideas put to work.",
    intro: "Notes on products, responsive interfaces, and software systems built to solve real problems.",
    count: "ARTICLES",
    read: "Read Article",
  },
} satisfies Record<Locale, Record<string, string>>;

export function WritingList({ posts, locale }: { posts: WritingPost[]; locale: Locale }) {
  const copy = COPY[locale];
  const dateLocale = locale === "it" ? "it-IT" : "en-US";
  const localePrefix = locale === "en" ? "/en" : "";

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 pb-24 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 grid gap-8 border-b border-[var(--color-border)] pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
              {copy.eyebrow}
            </span>
            <h1 className="max-w-4xl [font-family:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.88] tracking-tight text-[var(--foreground)]">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--foreground)] opacity-75 font-medium">
              {copy.intro}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)] self-start md:self-auto">
            <span>{String(posts.length).padStart(2, "0")}</span>
            <span className="opacity-60">{copy.count}</span>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ metadata }, index) => (
            <Link
              key={metadata.slug}
              href={`${localePrefix}/writing/${metadata.slug}`}
              className={`group rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 ${
                index === 0 ? "min-h-80 lg:col-span-2" : "min-h-72"
              }`}
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.2))",
              }}
            >
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                    {metadata.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--foreground)] opacity-60">
                    {metadata.readingTime}
                  </span>
                </div>

                <h2 className="mb-3 [font-family:var(--font-display)] text-3xl sm:text-4xl uppercase leading-[0.92] text-[var(--foreground)] tracking-tight">
                  {metadata.title}
                </h2>

                <p className="mb-8 text-sm sm:text-base leading-relaxed text-[var(--foreground)] opacity-80 font-medium">
                  {metadata.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <time dateTime={metadata.date} className="font-mono text-xs text-[var(--foreground)] opacity-60">
                  {new Date(metadata.date).toLocaleDateString(dateLocale, { year: "numeric", month: "short", day: "numeric" })}
                </time>

                <span className="btn-elastic inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span>{copy.read}</span>
                  <ArrowUpRight aria-hidden="true" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
