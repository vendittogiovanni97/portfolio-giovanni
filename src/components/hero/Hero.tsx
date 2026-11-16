"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { config } from "@/lib/config";
import { useI18n } from "@/i18n";

interface HeroCardConfig {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  baseRotate: number;
  baseY: number;
  zIndex: number;
  depth: number;
  badge?: string;
}

const HERO_CARDS: HeroCardConfig[] = [
  {
    title: "Portale Assicurativo",
    subtitle: "Enterprise ERP & AI OCR",
    image: "/projects/assicurativo-studio/showcase.png",
    href: "#work",
    baseRotate: -8,
    baseY: 10,
    zIndex: 10,
    depth: 1.25,
    badge: "ERP & OCR",
  },
  {
    title: "Nagma Tattoo CRM",
    subtitle: "SaaS & Kanban Studio",
    image: "/projects/nagma-tattoo-crm/showcase.png",
    href: "#work",
    baseRotate: -2,
    baseY: -8,
    zIndex: 11,
    depth: 0.85,
    badge: "Next.js 16",
  },
  {
    title: "N2G Inkflow",
    subtitle: "Studio Management & Calendar",
    image: "/projects/n2g-inkflow/showcase.png",
    href: "#work",
    baseRotate: 3,
    baseY: 8,
    zIndex: 12,
    depth: 1.05,
    badge: "FullCalendar",
  },
  {
    title: "Anthropic Claude",
    subtitle: "Official AI 101 & Cowork Certified",
    image: "/certificates/art/claude-cowork-art.svg",
    href: "#credentials",
    baseRotate: 8,
    baseY: -6,
    zIndex: 13,
    depth: 1.4,
    badge: "Anthropic AI",
  },
];

function InteractiveHeroCard({
  card,
  index,
  smoothMouseX,
  smoothMouseY,
  reduce,
}: {
  card: HeroCardConfig;
  index: number;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  reduce: boolean | null;
}) {
  // Parallax and 3D tilts derived from normalized mouse coordinates (-0.5 to 0.5)
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-32 * card.depth, 32 * card.depth]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-24 * card.depth + card.baseY, 24 * card.depth + card.baseY]);
  const tiltRotate = useTransform(smoothMouseX, [-0.5, 0.5], [card.baseRotate - 4, card.baseRotate + 4]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14 * card.depth, -14 * card.depth]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16 * card.depth, 16 * card.depth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.15 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 450, bounceDamping: 22 }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        zIndex: 50,
        transition: { type: "spring", stiffness: 350, damping: 20 },
      }}
      whileTap={{ scale: 0.96 }}
      style={{
        zIndex: card.zIndex,
        x: reduce ? 0 : parallaxX,
        y: reduce ? card.baseY : parallaxY,
        rotate: reduce ? card.baseRotate : tiltRotate,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className="relative group cursor-grab active:cursor-grabbing select-none"
    >
      <a
        href={card.href}
        className="block w-28 sm:w-44 md:w-56 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 sm:p-2 shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
        style={{
          boxShadow: "var(--shadow-sticker, 0 8px 0 rgba(0,0,0,0.3))",
        }}
      >
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 pointer-events-none">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(min-width: 768px) 250px, 140px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />

          {/* Subtle Badge Tag */}
          {card.badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs border border-white/20">
              {card.badge}
            </span>
          )}

          {/* Hover Glow Hint */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-2 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-lg">
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  // Normalized mouse coordinates: -0.5 to 0.5
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Spring smoothed mouse values
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 180, damping: 25, mass: 0.5 });
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 180, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    rawMouseX.set(normX);
    rawMouseY.set(normY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[95vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-10 select-none overflow-hidden"
    >
      {/* 1. TOP METADATA & 1-CLICK EMAIL (Spencer Gabor Style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-1.5 z-10"
      >
        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-85">
          {t.hero.location}
        </span>
        
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${config.email}`}
            className="font-mono text-[11px] sm:text-xs font-semibold text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity"
          >
            {config.email}
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn-elastic inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--foreground)] opacity-70 hover:opacity-100 cursor-pointer transition-all"
            title={t.hero.copyEmailAria}
            aria-label={t.hero.copyEmailAria}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 font-bold">{t.hero.copiedEmail}</span>
              </>
            ) : (
              <>
                <Copy className="w-2.5 h-2.5 opacity-60" />
                <span>{t.hero.copyEmail}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* 2. MID POSTER CENTERPIECE: Spencer Gabor Sandwich Composition with 3D Tilt & Parallax */}
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

        {/* FANNED TILTED PROJECT CARDS DECK (With Mouse Parallax & Tactile Drag Physics) */}
        <div className="relative flex items-center justify-center w-full my-1 sm:my-3 py-4 perspective-1000">
          <div className="flex items-center justify-center -space-x-8 sm:-space-x-12 md:-space-x-16">
            {HERO_CARDS.map((card, idx) => (
              <InteractiveHeroCard
                key={card.title}
                card={card}
                index={idx}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                reduce={reduce}
              />
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
        className="flex flex-col items-center gap-1.5 z-10 max-w-3xl px-2"
      >
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-60">
          {t.hero.coreStack}
        </span>
        <p className="font-mono text-[11px] sm:text-[12.5px] font-semibold uppercase tracking-wider text-[var(--foreground)] opacity-80 leading-relaxed">
          REACT 19 · NEXT.JS 16 · ANTHROPIC CLAUDE · THREE.JS · TYPESCRIPT · NODE.JS · DOCKER · TAILWIND 4
        </p>
      </motion.div>

    </header>
  );
}
