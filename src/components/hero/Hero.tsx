"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useI18n } from "@/i18n";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { HeroScene } from "./HeroScene";

function SplitHeadline({ text }: { text: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!wrapRef.current) return;
    const chars = wrapRef.current.querySelectorAll<HTMLElement>("[data-char]");
    if (reduce) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      chars,
      { opacity: 0, y: "40px" },
      {
        opacity: 1,
        y: "0px",
        duration: 1.25,
        ease: "power3.out",
        stagger: { each: 0.035, from: "start" },
      }
    );
    return () => {
      tween.kill();
    };
  }, [reduce]);

  return (
    <span ref={wrapRef} className="inline-block">
      {text.split("").map((ch, i) => (
        <span key={i} data-char className="inline-block will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay: delay * 0.45, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header
      id="about"
      className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
      style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}
    >
      {/* Faint print-grain texture, not a gradient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor 0, currentColor 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="hero-layout grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: the poster */}
          <div className="lg:col-span-7">
            <motion.div {...reveal(0)} className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold opacity-80">
                {t.hero.role}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs sm:text-xs font-mono tracking-wider uppercase border border-[var(--color-ink)]/20 bg-[var(--color-ink)]/5 font-semibold text-[var(--color-ink)] shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {t.hero.aiBadge}
              </span>
            </motion.div>

            <h1
              className="[font-family:var(--font-display)] uppercase text-[15vw] sm:text-[9vw] lg:text-[6.4vw] leading-[0.86] tracking-tight"
            >
              <SplitHeadline text="Giovanni" />
              <br />
              <span className="relative inline-block">
                <SplitHeadline text="Venditto" />
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? undefined : { scaleX: 0 }}
                  animate={reduce ? undefined : { scaleX: 1 }}
                  transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-[6%] h-[10%] w-full origin-left"
                  style={{ background: "var(--color-mark)" }}
                />
              </span>
            </h1>

            <motion.p
              {...reveal(0.5)}
              className="mt-8 max-w-xl text-lg sm:text-xl font-medium leading-relaxed [font-family:var(--font-body)]"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              {...reveal(0.58)}
              className="mt-4 max-w-lg text-base opacity-75 leading-relaxed [font-family:var(--font-body)]"
            >
              {t.hero.bio}
            </motion.p>

            <motion.div {...reveal(0.66)} className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 border-b-2 pb-1 text-base font-semibold [font-family:var(--font-body)] transition-colors cursor-pointer"
                style={{ borderColor: "var(--color-ink)" }}
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <Link
                href={href("/contact")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 text-sm font-semibold font-headline transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  borderColor: "var(--color-ink)",
                  background: "var(--color-ink)",
                  color: "var(--color-paper)",
                }}
              >
                <span>{t.hero.contactMe}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: real product proof, framed as a browser specimen */}
          <motion.div {...reveal(0.4)} className="lg:col-span-5 min-w-0">
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
