"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroCardProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  rotation: string;
  translateY: string;
  zIndex: number;
  badge?: string;
  accentBg?: string;
}

const HERO_CARDS: HeroCardProps[] = [
  {
    title: "Portale Assicurativo",
    subtitle: "Enterprise ERP & AI OCR",
    image: "/projects/assicurativo-studio/dashboard.png",
    href: "#work",
    rotation: "-rotate-8",
    translateY: "translate-y-3",
    zIndex: 10,
    badge: "ERP & OCR",
    accentBg: "#10b981",
  },
  {
    title: "Nagma Tattoo CRM",
    subtitle: "SaaS & Kanban Studio",
    image: "/projects/nagma-tattoo-crm/dashboard.png",
    href: "#work",
    rotation: "-rotate-2",
    translateY: "-translate-y-3",
    zIndex: 11,
    badge: "Next.js 16",
    accentBg: "#06b6d4",
  },
  {
    title: "Anthropic Claude",
    subtitle: "Official 101 & Cowork Certified",
    image: "/certificates/claude-cowork.png",
    href: "#credentials",
    rotation: "rotate-4",
    translateY: "translate-y-4",
    zIndex: 12,
    badge: "Anthropic",
    accentBg: "#d97706",
  },
  {
    title: "AI Document Engine",
    subtitle: "Deep OCR & Gemini Pipeline",
    image: "/projects/assicurativo-studio/elaborazione-polizze.png",
    href: "#work",
    rotation: "rotate-8",
    translateY: "-translate-y-2",
    zIndex: 13,
    badge: "AI Pipeline",
    accentBg: "#8b5cf6",
  },
];

export function Hero() {

  return (
    <header className="relative w-full min-h-[95vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-10 select-none overflow-hidden">
      
      {/* 1. TOP METADATA (Spencer Gabor Style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-1 z-10"
      >
        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-85">
          NAPOLI, ITALY · REMOTE / WORLDWIDE
        </span>
        <a
          href="mailto:giovannivenditto99@gmail.com"
          className="font-mono text-[11px] sm:text-xs font-semibold text-[var(--foreground)] opacity-55 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
        >
          giovannivenditto99@gmail.com
        </a>
      </motion.div>

      {/* 2. MID POSTER CENTERPIECE: Spencer Gabor Sandwich Composition */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-4 z-10">
        
        {/* LINE 1: Bold Solid Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center"
        >
          <h1 className="[font-family:var(--font-display)] uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight leading-[0.86] text-[var(--foreground)] drop-shadow-xs">
            Giovanni Venditto
          </h1>
        </motion.div>

        {/* FANNED TILTED PROJECT CARDS DECK (Spencer Gabor Signature) */}
        <div className="relative flex items-center justify-center w-full my-1 sm:my-3 py-4">
          <div className="flex items-center justify-center -space-x-8 sm:-space-x-12 md:-space-x-16">
            {HERO_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative group ${card.rotation} ${card.translateY} transition-all duration-500 ease-out hover:scale-120 hover:z-40 hover:rotate-0 hover:-translate-y-6 cursor-pointer`}
                style={{ zIndex: card.zIndex }}
              >
                <a
                  href={card.href}
                  className="block w-28 sm:w-44 md:w-56 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 sm:p-2 shadow-2xl transition-all duration-300 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                  style={{
                    boxShadow: "var(--shadow-sticker, 0 8px 0 rgba(0,0,0,0.3))",
                  }}
                >
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 768px) 250px, 140px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Subtle Badge Tag */}
                    {card.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs border border-white/20">
                        {card.badge}
                      </span>
                    )}

                    {/* Hover Glow Hint */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-lg">
                        <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LINE 2: Ghost / Muted Giant Headline (Behind / Below Cards) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center"
        >
          <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.88] text-[var(--color-secondary)] transition-colors duration-450 select-none">
            Fullstack, Designer &amp; AI
          </h2>
        </motion.div>
      </div>

      {/* 3. BOTTOM LINE: Clients & Tech (Spencer Gabor Style) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-1 z-10 max-w-3xl px-2"
      >
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-60">
          CORE STACK &amp; PRODUCTION SYSTEMS
        </span>
        <p className="font-mono text-[11px] sm:text-[12.5px] font-semibold uppercase tracking-wider text-[var(--foreground)] opacity-80 leading-relaxed">
          REACT 19 · NEXT.JS 16 · ANTHROPIC CLAUDE · THREE.JS · TYPESCRIPT · NODE.JS · DOCKER · TAILWIND 4
        </p>
      </motion.div>

    </header>
  );
}
