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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 pb-24 pt-32">
      <article className="mx-auto max-w-4xl">
        <Link
          href={`${localePrefix}/writing`}
          className="btn-elastic inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-10 group"
        >
          <ArrowLeft aria-hidden="true" size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>{COPY[locale].back}</span>
        </Link>

        <header className="mb-14 border-b border-[var(--color-border)] pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)]">
              {post.category}
            </span>
            <time dateTime={post.date} className="font-mono text-xs text-[var(--foreground)] opacity-60">
              {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="font-mono text-xs text-[var(--foreground)] opacity-60">
              · {post.readingTime}
            </span>
          </div>

          <h1 className="[font-family:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.88] tracking-tight text-[var(--foreground)]">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--foreground)] opacity-80 font-medium">
            {post.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={locale === "it" ? "Argomenti" : "Topics"}>
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="prose max-w-none text-[var(--foreground)] [&_h2]:[font-family:var(--font-display)] [&_h2]:uppercase [&_h2]:text-[var(--foreground)] [&_h2]:text-3xl sm:[&_h2]:text-4xl [&_h2]:mb-6 [&_h2]:mt-16 [&_h2]:tracking-tight [&_h3]:[font-family:var(--font-display)] [&_h3]:uppercase [&_h3]:text-[var(--foreground)] [&_h3]:text-2xl [&_h3]:mb-4 [&_h3]:mt-10 [&_p]:text-[var(--foreground)] [&_p]:opacity-85 [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[var(--foreground)] [&_li]:opacity-85 [&_strong]:text-[var(--foreground)] [&_strong]:font-bold [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-[var(--color-surface)] [&_code]:border [&_code]:border-[var(--color-border)] [&_code]:text-[var(--foreground)] [&_code]:font-mono [&_code]:text-xs">
          {children}
        </div>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
          <Link
            href={`${localePrefix}/writing`}
            className="btn-elastic inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] group"
          >
            <ArrowLeft aria-hidden="true" size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{COPY[locale].back}</span>
          </Link>
        </footer>
      </article>
    </main>
  );
}
