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
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header className="relative w-full overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#f5f4f2] text-[#111111]">
      {/* 3D WebGL Fluid Interactive Grid in Background */}
      <InteractiveGridCanvas />
      
      {/* Bottom Soft Vignette Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f5f4f2] to-transparent pointer-events-none z-1" />

      <div className="relative z-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Typography & Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Live Availability Badge TasteSkill style */}
            <motion.div {...reveal(0.04)} className="flex flex-wrap items-center gap-2.5 mb-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/90 py-1 pl-1 pr-3.5 text-[13px] shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#111111] py-0.5 px-2.5 text-[11.5px] font-medium text-[#f2f1e8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Disponibile
                </span>
                <span className="font-medium text-neutral-700">Per nuovi progetti & freelance</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 py-1 px-3 text-[12.5px] font-medium text-neutral-800 shadow-[0_1px_2px_rgba(10,10,10,0.03)]">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                <span>Certificato Ufficiale Anthropic</span>
              </div>
            </motion.div>

            {/* Sculptural Headline */}
            <motion.div {...reveal(0.1)} className="w-full">
              <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-semibold leading-[0.93] tracking-[-0.05em] text-[#111111]">
                Giovanni Venditto
              </h1>
              
              <p className="mt-5 text-[22px] sm:text-[28px] font-medium leading-[1.18] tracking-[-0.03em] text-[#111111]">
                Fullstack & AI-Ready Engineer.
              </p>
            </motion.div>

            {/* Tagline & Bio */}
            <motion.p
              {...reveal(0.18)}
              className="mt-4 max-w-[48ch] text-[16px] sm:text-[17px] leading-relaxed text-neutral-600"
            >
              {t.hero.tagline}
            </motion.p>

            {/* Actions: TasteSkill button pair */}
            <motion.div {...reveal(0.26)} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-shimmer inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111111] px-5 text-[14.5px] font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.97] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowDown className="w-4 h-4 text-white/70" />
              </a>

              <Link
                href={href("/contact")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-[14.5px] font-medium text-[#111111] transition-all hover:border-black/20 hover:bg-neutral-50 active:scale-[0.97] cursor-pointer shadow-xs"
              >
                <span>{t.hero.contactMe}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </Link>
            </motion.div>

            {/* Tactile Metric Card */}
            <motion.div
              {...reveal(0.34)}
              className="mt-10 p-5 rounded-2xl border border-black/[0.08] bg-white/85 backdrop-blur-xs card-elevation-subtle w-full grid grid-cols-3 gap-3 sm:gap-4"
            >
              <div>
                <div className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#111111]">2+ anni</div>
                <div className="text-[12px] text-neutral-500 mt-0.5 font-medium leading-tight">Ingegneria di produzione</div>
              </div>
              <div className="border-x border-black/[0.06] px-2 sm:px-4">
                <div className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#111111]">4x ROI</div>
                <div className="text-[12px] text-neutral-500 mt-0.5 font-medium leading-tight">Automazione & OCR AI</div>
              </div>
              <div>
                <div className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.03em] text-emerald-600">&lt;180ms</div>
                <div className="text-[12px] text-neutral-500 mt-0.5 font-medium leading-tight">Latenza Core Web Vitals</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Pure Floating 3D AI Core (Zero Card, Zero Box, Frameless) */}
          <motion.div
            {...reveal(0.18)}
            className="lg:col-span-5 w-full flex items-center justify-center relative min-h-[360px] sm:min-h-[440px]"
          >
            <FloatingAICoreCanvas />
          </motion.div>

        </div>
      </div>
    </header>
  );
}
