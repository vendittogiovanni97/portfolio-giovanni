import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/server";
import type { WritingPost } from "@/lib/writing";

const COPY = {
  it: {
    title: "Idee messe alla prova.",
    intro: "Appunti su prodotti, interfacce e sistemi software costruiti per risolvere problemi reali.",
    count: "ARTICOLI",
    read: "LEGGI ARTICOLO",
  },
  en: {
    title: "Ideas put to work.",
    intro: "Notes on products, interfaces, and software systems built to solve real problems.",
    count: "ARTICLES",
    read: "READ ARTICLE",
  },
} satisfies Record<Locale, Record<string, string>>;

export function WritingList({ posts, locale }: { posts: WritingPost[]; locale: Locale }) {
  const copy = COPY[locale];
  const dateLocale = locale === "it" ? "it-IT" : "en-US";
  const localePrefix = locale === "en" ? "/en" : "";

  return (
    <main className="min-h-screen px-gutter pb-24 pt-36">
      <div className="mx-auto max-w-container-max">
        <header className="mb-14 grid gap-8 border-b border-accent/20 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="max-w-4xl [font-family:var(--font-display)] text-6xl uppercase leading-[0.88] tracking-tight text-slate-100 sm:text-7xl lg:text-8xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{copy.intro}</p>
          </div>
          <p className="font-code-snippet text-xs uppercase tracking-[0.16em] text-slate-400">
            <span className="text-accent">{String(posts.length).padStart(2, "0")}</span> {copy.count}
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ metadata }, index) => (
            <Link
              key={metadata.slug}
              href={`${localePrefix}/writing/${metadata.slug}`}
              className={`group depth-panel depth-panel--center flex flex-col border border-slate-800 bg-surface p-6 shadow-[5px_6px_0_var(--color-shadow-panel)] transition-colors hover:border-accent/50 sm:p-8 ${index === 0 ? "min-h-80 lg:col-span-2" : "min-h-72"}`}
            >
              <div className="mb-10 flex items-center justify-between gap-4 font-code-snippet text-[10px] uppercase tracking-[0.14em] text-slate-400">
                <span>{metadata.category}</span>
              </div>
              <h2 className="mb-4 [font-family:var(--font-display)] text-3xl uppercase leading-[0.94] text-slate-100 transition-colors group-hover:text-accent sm:text-4xl">
                {metadata.title}
              </h2>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400">{metadata.description}</p>
              <div className="flex items-center justify-between border-t border-slate-800 pt-4 font-code-snippet text-[10px] uppercase tracking-[0.12em] text-slate-400">
                <time dateTime={metadata.date}>
                  {new Date(metadata.date).toLocaleDateString(dateLocale, { year: "numeric", month: "short" })}
                </time>
                <span>{metadata.readingTime}</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-code-snippet text-[10px] uppercase tracking-[0.14em] text-accent">
                {copy.read} <ArrowUpRight aria-hidden="true" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
