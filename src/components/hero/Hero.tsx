"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { InteractiveGridCanvas } from "@/components/canvas/InteractiveGridCanvas";
import { FloatingAICoreCanvas } from "@/components/canvas/FloatingAICoreCanvas";

export function Hero() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header className="relative w-full overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-transparent text-[var(--foreground)]">
      {/* 3D WebGL Fluid Interactive Grid in Background */}
      <InteractiveGridCanvas />
      
      {/* Bottom Soft Vignette Fade to current theme background */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none z-1 transition-colors duration-450" />

      <div className="relative z-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Massive Kinetic Typography & Bold Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Live Availability Badge & Anthropic Pill (Spencer Gabor Sticker Style) */}
            <motion.div {...reveal(0.04)} className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-1.5 pr-4 text-[13px] shadow-sm transition-transform hover:scale-105 active:scale-95 duration-300">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-pill-bg)] py-1 px-3 text-[11px] font-bold text-[var(--color-pill-text)] uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Disponibile
                </span>
                <span className="font-semibold text-[var(--foreground)] opacity-90">Per nuovi progetti & ruoli</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 px-3.5 text-[12.5px] font-semibold text-[var(--foreground)] shadow-sm transition-transform hover:scale-105 active:scale-95 duration-300">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)] animate-pulse" />
                <span>Anthropic Claude Certified</span>
              </div>
            </motion.div>

            {/* Sculptural Spencer Gabor Headline */}
            <motion.div {...reveal(0.1)} className="w-full">
              <h1 className="[font-family:var(--font-display)] uppercase text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[var(--foreground)]">
                Giovanni
                <br />
                <span className="text-[var(--color-accent)] transition-colors duration-450 drop-shadow-sm">
                  Venditto
                </span>
              </h1>
              
              <p className="mt-6 text-[20px] sm:text-[24px] font-bold uppercase tracking-tight text-[var(--foreground)] opacity-95">
                Fullstack & Creative AI Engineer
              </p>
            </motion.div>

            {/* Tagline & Manifesto */}
            <motion.p
              {...reveal(0.18)}
              className="mt-4 max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-[var(--foreground)] opacity-80"
            >
              {t.hero.tagline}
            </motion.p>

            {/* Elastic Pill CTAs */}
            <motion.div {...reveal(0.26)} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-elastic inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] px-7 text-[15px] font-bold uppercase tracking-wider text-[var(--color-accent-contrast)] cursor-pointer shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.3))",
                }}
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <Link
                href={href("/contact")}
                className="btn-elastic inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-7 text-[15px] font-bold uppercase tracking-wider text-[var(--foreground)] cursor-pointer shadow-sm hover:border-[var(--color-accent)]"
              >
                <span>{t.hero.contactMe}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </motion.div>

            {/* Tactile Impact Numbers (Sticker Style) */}
            <motion.div
              {...reveal(0.34)}
              className="mt-10 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md w-full grid grid-cols-3 gap-3 sm:gap-4 shadow-sm"
              style={{
                boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.2))",
              }}
            >
              <div>
                <div className="[font-family:var(--font-display)] text-[28px] sm:text-[34px] uppercase tracking-tight text-[var(--foreground)] leading-none">
                  2+ Anni
                </div>
                <div className="text-[12px] font-semibold text-[var(--foreground)] opacity-70 mt-1 uppercase tracking-wider">
                  Produzione
                </div>
              </div>
              <div className="border-x border-[var(--color-border)] px-2 sm:px-4">
                <div className="[font-family:var(--font-display)] text-[28px] sm:text-[34px] uppercase tracking-tight text-[var(--color-accent)] leading-none transition-colors duration-450">
                  4x ROI
                </div>
                <div className="text-[12px] font-semibold text-[var(--foreground)] opacity-70 mt-1 uppercase tracking-wider">
                  Automazione AI
                </div>
              </div>
              <div>
                <div className="[font-family:var(--font-display)] text-[28px] sm:text-[34px] uppercase tracking-tight text-emerald-500 leading-none">
                  &lt;180ms
                </div>
                <div className="text-[12px] font-semibold text-[var(--foreground)] opacity-70 mt-1 uppercase tracking-wider">
                  Core Web Vitals
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Pure Floating 3D AI Core */}
          <motion.div
            {...reveal(0.18)}
            className="lg:col-span-5 w-full flex items-center justify-center relative min-h-[360px] sm:min-h-[460px]"
          >
            <FloatingAICoreCanvas />
          </motion.div>

        </div>
      </div>
    </header>
  );
}
