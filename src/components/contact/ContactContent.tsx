"use client";

import { useI18n } from "@/i18n";
import { ContactForm } from "@/components/layout/ContactForm";
import { config } from "@/lib/config";
import { Calendar, Download, ArrowRight, ArrowUpRight } from "lucide-react";

export function ContactContent() {
  const { t } = useI18n();

  return (
    <div className="w-full">
      {/* Editorial Spencer Gabor Header */}
      <div className="mb-12 border-b border-[var(--color-border)] pb-8">
        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
          GET IN TOUCH · LET&apos;S TALK
        </span>
        <h1 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl text-[var(--foreground)] tracking-tight leading-[0.88]">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Tactile Form Card */}
        <div
          className="lg:col-span-7 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-9"
          style={{
            boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
          }}
        >
          <div className="mb-6 pb-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <h2 className="[font-family:var(--font-display)] uppercase text-2xl text-[var(--foreground)] tracking-tight">
              Invia un messaggio
            </h2>
            <span className="font-mono text-[11px] text-[var(--foreground)] opacity-60">
              Risposta entro 24h
            </span>
          </div>
          <ContactForm />
        </div>

        {/* Right Column: Calendly, CV & Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Calendly 30-min Discovery Call */}
          <div
            className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-7 relative overflow-hidden"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                <Calendar className="w-4 h-4" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                CALENDLY · 30 MIN
              </span>
            </div>

            <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight mb-2">
              {t.contact.bookCallTitle}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--foreground)] opacity-75 leading-relaxed mb-5 font-medium">
              {t.contact.bookCallDesc}
            </p>

            <a
              href={config.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-elastic w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 active:scale-98 transition-transform cursor-pointer"
            >
              <span>{t.contact.bookCallButton}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="mt-3 text-center">
              <a
                href={`mailto:${config.email}?subject=Richiesta%20Call%20Conoscitiva%20(30%20min)`}
                className="font-mono text-[11px] text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity"
              >
                {t.contact.bookCallEmailDirect} →
              </a>
            </div>
          </div>

          {/* 2. Download CV Card */}
          <div
            className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
            }}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-65 block mb-2">
              {t.contact.downloadCvTitle}
            </span>
            <p className="text-xs sm:text-sm text-[var(--foreground)] opacity-75 leading-relaxed mb-4 font-medium">
              {t.contact.downloadCvDesc}
            </p>
            <a
              href="/documents/CV_Giovanni_Venditto.pdf"
              download="CV_Giovanni_Venditto.pdf"
              className="btn-elastic w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-border)] bg-[var(--background)] text-[var(--foreground)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.contact.downloadCvButton}</span>
            </a>
          </div>

          {/* 3. Direct Email & Availability */}
          <div
            className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-65">
                {t.contact.directContact}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-80">
                  {t.contact.availableForFreelance}
                </span>
              </div>
            </div>

            <a
              href={`mailto:${config.email}`}
              className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] hover:opacity-75 transition-opacity block mb-1"
            >
              {config.email}
            </a>
            <span className="font-mono text-[11px] text-[var(--foreground)] opacity-60 block mb-5">
              {t.contact.replyWithin}
            </span>

            {/* Social pills */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-2">
              <a
                href={`https://linkedin.com/in/${config.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elastic inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a
                href={`https://github.com/${config.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elastic inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a
                href={`https://twitter.com/${config.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elastic inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)]"
              >
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
