import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/server";
import type { WritingMetadata } from "@/lib/writing";

const COPY = {
  it: { back: "Torna agli articoli" },
  en: { back: "Back to writing" },
} satisfies Record<Locale, Record<string, string>>;

export function WritingPostLayout({
  post,
  locale,
  children,
}: {
  post: WritingMetadata;
  locale: Locale;
  children: React.ReactNode;
}) {
  const localePrefix = locale === "en" ? "/en" : "";
  const dateLocale = locale === "it" ? "it-IT" : "en-US";

  return (
    <main className="min-h-screen px-gutter pb-24 pt-36">
      <article className="mx-auto max-w-4xl">
        <Link
          href={`${localePrefix}/writing`}
          className="mb-10 inline-flex font-code-snippet text-xs uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-bright"
        >
          <ArrowLeft aria-hidden="true" size={14} /> {COPY[locale].back}
        </Link>
        <header className="mb-14 border-b border-accent/20 pb-10">
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-code-snippet text-xs uppercase tracking-[0.12em] text-slate-400">
            <span className="text-accent">{post.category}</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="[font-family:var(--font-display)] text-5xl uppercase leading-[0.9] tracking-tight text-slate-100 sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">{post.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={locale === "it" ? "Argomenti" : "Topics"}>
            {post.tags.map((tag) => (
              <li key={tag} className="border border-accent/20 px-2.5 py-1 font-code-snippet text-[10px] text-accent">{tag}</li>
            ))}
          </ul>
        </header>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:[font-family:var(--font-display)] prose-headings:font-normal prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-slate-100 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-li:marker:text-accent prose-strong:text-slate-100 prose-a:text-accent prose-code:text-accent prose-code:bg-surface prose-pre:border prose-pre:border-slate-800 prose-pre:bg-surface">
          {children}
        </div>
        <footer className="mt-16 border-t border-accent/20 pt-8">
          <Link href={`${localePrefix}/writing`} className="font-code-snippet text-xs uppercase tracking-[0.12em] text-accent hover:text-accent-bright">
            <ArrowLeft aria-hidden="true" size={14} /> {COPY[locale].back}
          </Link>
        </footer>
      </article>
    </main>
  );
}
