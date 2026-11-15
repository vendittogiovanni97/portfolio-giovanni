"use client";

import { useI18n } from "@/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "it" : "en")}
      className="btn-elastic h-8 px-3 rounded-full flex items-center justify-center border border-[var(--color-border)] text-[var(--foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] font-mono text-xs font-bold transition-all cursor-pointer"
      aria-label={`Switch to ${locale === "en" ? "Italian" : "English"}`}
    >
      {locale === "en" ? "IT" : "EN"}
    </button>
  );
}
