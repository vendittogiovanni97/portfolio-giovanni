"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useI18n } from "@/i18n";
import { RotateCcw, Sparkles, Move } from "lucide-react";

interface StickerItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  baseRotate: number;
  bg: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  defaultX: number; // Percentage 0-100 of arena width
  defaultY: number; // Percentage 0-100 of arena height
  icon: ReactNode;
}

const STICKERS: StickerItem[] = [
  {
    id: "pizza",
    title: "PIZZA NAPOLI",
    subtitle: "Origin · 081 Core",
    tag: "ROOTS",
    baseRotate: -8,
    bg: "#E63946",
    textColor: "#FFFFFF",
    badgeBg: "#FFFFFF",
    badgeText: "#E63946",
    borderColor: "#1E1E1E",
    defaultX: 6,
    defaultY: 8,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2L2 28C2 28 8 30 16 30C24 30 30 28 30 28L16 2Z"
          fill="#F4A261"
          stroke="#1E1E1E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M6 24C10 26 22 26 26 24"
          stroke="#E76F51"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="18" r="2.5" fill="#C1121F" stroke="#1E1E1E" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#C1121F" stroke="#1E1E1E" strokeWidth="1.5" />
        <circle cx="20" cy="14" r="2" fill="#C1121F" stroke="#1E1E1E" strokeWidth="1.5" />
        <path d="M14 24C15 22 17 22 18 24" stroke="#2A9D8F" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "claude",
    title: "CLAUDE 101",
    subtitle: "Anthropic Certified",
    tag: "AI ARCHITECT",
    baseRotate: 6,
    bg: "#D97757",
    textColor: "#FFFFFF",
    badgeBg: "#1E1E1E",
    badgeText: "#FDF8F5",
    borderColor: "#1E1E1E",
    defaultX: 54,
    defaultY: 8,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2L18.8 11.2L28 14L18.8 16.8L16 26L13.2 16.8L4 14L13.2 11.2L16 2Z"
          fill="#FFF"
          stroke="#1E1E1E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="14" r="2" fill="#D97757" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    title: "NEXT.JS 16",
    subtitle: "React 19 & Turbopack",
    tag: "180MS",
    baseRotate: -4,
    bg: "#0A0A0A",
    textColor: "#FFFFFF",
    badgeBg: "#00F0FF",
    badgeText: "#0A0A0A",
    borderColor: "#2C2C2C",
    defaultX: 8,
    defaultY: 38,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#141414" stroke="#FFF" strokeWidth="2" />
        <path d="M12 9V23M20 9L13 22" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 15V23" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "spencer",
    title: "SPENCER VIBE",
    subtitle: "Tactile Design System",
    tag: "STYLE",
    baseRotate: 5,
    bg: "#A3E635",
    textColor: "#0A0A0A",
    badgeBg: "#0A0A0A",
    badgeText: "#A3E635",
    borderColor: "#0A0A0A",
    defaultX: 56,
    defaultY: 40,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="26" height="26" rx="9" fill="#FACC15" stroke="#0A0A0A" strokeWidth="2.5" />
        <circle cx="11" cy="13" r="2.5" fill="#0A0A0A" />
        <circle cx="21" cy="13" r="2.5" fill="#0A0A0A" />
        <path d="M10 19C12 23 20 23 22 19" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "espresso",
    title: "ESPRESSO CODE",
    subtitle: "Double Shot Daily",
    tag: "FUEL",
    baseRotate: -7,
    bg: "#3E2723",
    textColor: "#FFF8E1",
    badgeBg: "#D7CCC8",
    badgeText: "#3E2723",
    borderColor: "#1E1E1E",
    defaultX: 6,
    defaultY: 68,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 14H23V21C23 24.3 20.3 27 17 27H15C11.7 27 9 24.3 9 21V14Z" fill="#8D6E63" stroke="#FFF" strokeWidth="2" />
        <path d="M23 16H26C27.1 16 28 16.9 28 18C28 19.1 27.1 20 26 20H23" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 10C13 8 14 7 14 5" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 10C18 8 19 7 19 5" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "rocket",
    title: "SHIPPED TO PROD",
    subtitle: "Zero Regressions",
    tag: "PROD",
    baseRotate: 8,
    bg: "#F97316",
    textColor: "#FFFFFF",
    badgeBg: "#FFFFFF",
    badgeText: "#F97316",
    borderColor: "#1E1E1E",
    defaultX: 54,
    defaultY: 68,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M26 6C26 6 22 7 17 12C14.5 14.5 13 18 13 18L10 19L6 17L5 19L9 23L7 27L11 26L13 30L15 29L13 25L14 22C14 22 17.5 20.5 20 18C25 13 26 6 26 6Z"
          fill="#FFF"
          stroke="#1E1E1E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="13" r="2" fill="#F97316" />
        <path d="M6 26L3 29" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function PhysicalSticker({
  sticker,
  arenaRef,
  resetTrigger,
  scatterTrigger,
}: {
  sticker: StickerItem;
  arenaRef: React.RefObject<HTMLDivElement | null>;
  resetTrigger: number;
  scatterTrigger: number;
}) {
  const reduce = useReducedMotion();
  const [isGrabbed, setIsGrabbed] = useState(false);

  // Motion values to track velocity and apply real angular fling
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xVelocity = useVelocity(x);

  // Angular tilt calculated from throw velocity
  const velocityTilt = useTransform(xVelocity, [-1800, 1800], [-30, 30]);
  const smoothVelocityTilt = useSpring(velocityTilt, { stiffness: 420, damping: 24 });

  // Reset or Scatter on demand
  useEffect(() => {
    if (resetTrigger > 0) {
      x.set(0);
      y.set(0);
    }
  }, [resetTrigger, x, y]);

  useEffect(() => {
    if (scatterTrigger > 0) {
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 120;
      x.set(randomX);
      y.set(randomY);
    }
  }, [scatterTrigger, x, y]);

  return (
    <motion.div
      drag
      dragConstraints={arenaRef}
      dragElastic={0.28}
      dragMomentum={true}
      dragTransition={{
        power: 0.38,
        timeConstant: 220,
        bounceStiffness: 450,
        bounceDamping: 18,
      }}
      onDragStart={() => setIsGrabbed(true)}
      onDragEnd={() => setIsGrabbed(false)}
      data-cursor="drag"
      whileHover={{
        scale: 1.08,
        zIndex: 35,
        transition: { type: "spring", stiffness: 350, damping: 20 },
      }}
      whileTap={{
        scale: 1.16,
        zIndex: 50,
      }}
      style={{
        left: `${sticker.defaultX}%`,
        top: `${sticker.defaultY}%`,
        x,
        y,
        rotate: reduce ? sticker.baseRotate : smoothVelocityTilt,
        backgroundColor: sticker.bg,
        color: sticker.textColor,
        borderColor: sticker.borderColor,
        boxShadow: isGrabbed
          ? "0 24px 38px rgba(0,0,0,0.35), 0 8px 12px rgba(0,0,0,0.2)"
          : "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.25))",
      }}
      className="absolute cursor-grab active:cursor-grabbing select-none rounded-[22px] sm:rounded-[26px] border-[2.5px] p-2.5 sm:p-3.5 transition-shadow duration-200 flex items-center gap-2.5 sm:gap-3 shrink-0 shadow-lg will-change-transform w-[190px] sm:w-[220px]"
    >
      {/* Tactile Icon Illustration */}
      <div className="shrink-0 p-1.5 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20">
        {sticker.icon}
      </div>

      {/* Text Label & Badge */}
      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            style={{ backgroundColor: sticker.badgeBg, color: sticker.badgeText }}
            className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
          >
            {sticker.tag}
          </span>
        </div>
        <h4 className="[font-family:var(--font-display)] uppercase text-sm sm:text-base tracking-tight leading-tight truncate">
          {sticker.title}
        </h4>
        <span className="text-[10.5px] sm:text-[11px] font-mono opacity-85 truncate block">
          {sticker.subtitle}
        </span>
      </div>

      {/* Spencer Gabor Sticker Inner White Bevel Rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30"
      />
    </motion.div>
  );
}

export function StickerPlayground() {
  const { t } = useI18n();
  const arenaRef = useRef<HTMLDivElement>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [scatterTrigger, setScatterTrigger] = useState(0);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleScatter = () => {
    setScatterTrigger((prev) => prev + 1);
  };

  return (
    <section id="stickers" className="w-full relative py-12 sm:py-16 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)] opacity-60 mb-2 block">
              {t.stickers.badge}
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-6xl tracking-tight leading-[0.92] text-[var(--foreground)]">
              {t.stickers.title}
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] text-[var(--foreground)] opacity-70 font-medium max-w-lg leading-relaxed">
              {t.stickers.subtitle}
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleScatter}
              className="btn-elastic inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-xs hover:bg-[var(--color-surface-muted)] cursor-pointer transition-colors"
              title={t.stickers.scatter}
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5] text-amber-500" />
              <span>{t.stickers.scatter}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn-elastic inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 cursor-pointer transition-transform"
              style={{
                boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.2))",
              }}
              title={t.stickers.reset}
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t.stickers.reset}</span>
            </button>
          </div>
        </div>

        {/* Physics Arena Box (Tactile Spencer Gabor Playboard) */}
        <div
          ref={arenaRef}
          className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-[32px] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40 overflow-hidden backdrop-blur-xs p-4"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        >
          {/* Subtle Center Watermark / Prompt */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 dark:opacity-20">
            <div className="flex items-center gap-2 border-2 border-[var(--color-border)] px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-[var(--foreground)] font-bold">
              <Move className="w-4 h-4 stroke-[2.5]" />
              <span>{t.stickers.hint}</span>
            </div>
          </div>

          {/* Interactive Physical Stickers */}
          {STICKERS.map((sticker) => (
            <PhysicalSticker
              key={sticker.id}
              sticker={sticker}
              arenaRef={arenaRef}
              resetTrigger={resetTrigger}
              scatterTrigger={scatterTrigger}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
