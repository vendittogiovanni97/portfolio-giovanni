"use client";

import { config } from "@/lib/config";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { useI18n } from "@/i18n";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const { href, t } = useI18n();

  return (
    <footer className="relative w-full border-t border-[var(--color-border)] mt-24 bg-[var(--color-surface)] text-[var(--foreground)] transition-colors duration-450">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        
        {/* Massive Spencer Gabor CTA */}
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
            {t.footer.available}
          </span>
          <h2 className="[font-family:var(--font-display)] uppercase text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[var(--foreground)]">
            Let&apos;s Build
            <br />
            <span className="text-[var(--color-accent)] transition-colors duration-450">
              Something Bold.
            </span>
          </h2>
          <p className="mt-6 text-[18px] sm:text-[22px] font-medium text-[var(--foreground)] opacity-75 max-w-2xl leading-relaxed">
            {t.footer.pitch}
          </p>
        </div>

        {/* Big Tactile Pill Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href={`mailto:${config.email}`}
            className="btn-elastic inline-flex h-13 sm:h-14 items-center justify-center gap-3 rounded-full bg-[var(--color-accent)] px-8 text-[15px] font-bold uppercase tracking-wider text-[var(--color-accent-contrast)] shadow-lg cursor-pointer"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.3))",
            }}
          >
            <Mail className="w-5 h-5 stroke-[2.5]" />
            <span>{config.email}</span>
          </a>

          <Link
            href={href("/contact")}
            className="btn-elastic inline-flex h-13 sm:h-14 items-center justify-center gap-3 rounded-full border-2 border-[var(--color-border)] bg-[var(--background)] px-7 text-[15px] font-bold uppercase tracking-wider text-[var(--foreground)] cursor-pointer"
          >
            <span>{t.footer.contactForm}</span>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </Link>

          <a
            href="/documents/CV_Giovanni_Venditto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Giovanni_Venditto.pdf"
            className="btn-elastic inline-flex h-13 sm:h-14 items-center justify-center gap-3 rounded-full border-2 border-[var(--color-border)] bg-[var(--background)] px-7 text-[15px] font-bold uppercase tracking-wider text-[var(--foreground)] cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>{t.footer.downloadCv}</span>
          </a>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-[var(--color-border)] mb-12">
          <a
            href={`https://linkedin.com/in/${config.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 hover:opacity-100 hover:text-[var(--color-accent)] transition-all flex items-center gap-1.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={`https://github.com/${config.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 hover:opacity-100 hover:text-[var(--color-accent)] transition-all flex items-center gap-1.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/${config.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 hover:opacity-100 hover:text-[var(--color-accent)] transition-all flex items-center gap-1.5"
          >
            <span>X (Twitter)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[var(--foreground)] opacity-60">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-7 h-7 rounded-[8px] overflow-hidden" />
            <span>
              {config.authorName} · {t.footer.role}
            </span>
          </div>

          <p>
            © {new Date().getFullYear()} {config.authorName}. Built with Next.js 16, Three.js & Tailwind 4.
          </p>
        </div>
      </div>
    </footer>
  );
}
