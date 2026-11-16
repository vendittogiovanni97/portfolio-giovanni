"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, X, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

export interface AccordionItemData {
  id: string;
  badge?: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
}

export interface AppleAccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string | null;
  className?: string;
}

const APPLE_EASE = [0.645, 0.045, 0.355, 1] as const;

export function AppleAccordion({
  items,
  defaultOpenId = null,
  className = "",
}: AppleAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = items.findIndex((item) => item.id === openId);

  const handleToggle = (id: string) => {
    sound.playPop();
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (activeIndex > 0) {
      setOpenId(items[activeIndex - 1].id);
    } else {
      setOpenId(items[items.length - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (activeIndex < items.length - 1) {
      setOpenId(items[activeIndex + 1].id);
    } else {
      setOpenId(items[0].id);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openId !== null) {
        setOpenId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openId]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-3 w-full max-w-4xl mx-auto ${className}`}
    >
      {items.map((item, idx) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            layout={!shouldReduceMotion}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.45,
              ease: APPLE_EASE,
            }}
            className={`group relative overflow-hidden transition-all select-none ${
              isOpen
                ? "rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-xl"
                : "rounded-full bg-[var(--color-surface)]/80 hover:bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 shadow-xs hover:shadow-md"
            }`}
          >
            {/* COLLAPSED PILL TRIGGER */}
            {!isOpen && (
              <motion.button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="w-full flex items-center justify-between px-5 sm:px-7 py-4 sm:py-4.5 text-left cursor-pointer transition-transform active:scale-[0.99]"
                aria-expanded="false"
                aria-controls={`accordion-content-${item.id}`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] group-hover:scale-110 transition-transform">
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-[var(--foreground)] opacity-40 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                    <h3 className="[font-family:var(--font-display)] text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--foreground)] truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-3">
                  {item.badge && (
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] opacity-85">
                      {item.badge}
                    </span>
                  )}
                  <span className="font-mono text-xs text-[var(--foreground)] opacity-50 hidden sm:inline truncate max-w-[220px]">
                    {item.shortDesc}
                  </span>
                </div>
              </motion.button>
            )}

            {/* EXPANDED CARD STATE */}
            {isOpen && (
              <motion.div
                id={`accordion-content-${item.id}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.35,
                  delay: shouldReduceMotion ? 0 : 0.08,
                  ease: APPLE_EASE,
                }}
                className="p-6 sm:p-8 flex flex-col gap-6"
              >
                {/* Header Bar */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[var(--foreground)] opacity-40 uppercase tracking-widest">
                        0{idx + 1} · SERVICE
                      </span>
                      {item.badge && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="[font-family:var(--font-display)] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--foreground)]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Actions: Prev / Next / Close */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="hidden sm:flex items-center bg-[var(--color-badge-bg)] rounded-full p-1 border border-[var(--color-border)]">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1.5 rounded-full hover:bg-[var(--color-surface)] text-[var(--foreground)] opacity-70 hover:opacity-100 transition-all cursor-pointer"
                        title="Precedente"
                        aria-label="Precedente"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1.5 rounded-full hover:bg-[var(--color-surface)] text-[var(--foreground)] opacity-70 hover:opacity-100 transition-all cursor-pointer"
                        title="Successivo"
                        aria-label="Successivo"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className="p-2 sm:p-2.5 rounded-full bg-[var(--color-badge-bg)] hover:bg-[var(--color-border)] text-[var(--foreground)] transition-all cursor-pointer hover:rotate-90"
                      title="Chiudi (Esc)"
                      aria-label="Chiudi"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Full Description & Strategy */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <p className="text-sm sm:text-base leading-relaxed text-[var(--foreground)] opacity-85">
                      {item.fullDesc}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50">
                        Cosa comprende / Deliverables:
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {item.deliverables.map((del, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-[var(--foreground)] opacity-90"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Key Technologies & Capabilities */}
                  <div className="md:col-span-5 flex flex-col gap-3 p-4.5 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]/50">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
                      Tecnologie & Architettura:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
