"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, X, ChevronUp, ChevronDown, Check } from "lucide-react";
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
  defaultOpenId = "platforms",
  className = "",
}: AppleAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const shouldReduceMotion = useReducedMotion();

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
    <div className={`flex flex-col gap-3 w-full max-w-3xl mx-auto ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            layout={!shouldReduceMotion}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.42,
              ease: APPLE_EASE,
            }}
            className={`group relative overflow-hidden transition-all duration-300 ${
              isOpen
                ? "rounded-[2rem] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
                : "rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)] shadow-xs hover:shadow-sm"
            }`}
          >
            {/* COLLAPSED PILL TRIGGER */}
            {!isOpen && (
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="w-full flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 text-left cursor-pointer transition-transform active:scale-[0.995]"
                aria-expanded="false"
                aria-controls={`accordion-content-${item.id}`}
              >
                <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-badge-bg)] text-[var(--foreground)] group-hover:scale-105 group-hover:border-[var(--foreground)]/40 transition-all">
                    <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  </span>

                  <span className="font-mono text-xs font-semibold text-[var(--foreground)] opacity-40 uppercase tracking-widest flex-shrink-0">
                    0{idx + 1}
                  </span>

                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--foreground)] truncate">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 pl-3">
                  {item.badge && (
                    <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-medium uppercase tracking-wider bg-[var(--color-badge-bg)] text-[var(--foreground)] opacity-70">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            )}

            {/* EXPANDED CARD STATE */}
            {isOpen && (
              <motion.div
                id={`accordion-content-${item.id}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.35,
                  delay: shouldReduceMotion ? 0 : 0.05,
                  ease: APPLE_EASE,
                }}
                className="p-6 sm:p-9 flex flex-col gap-6"
              >
                {/* Header Bar */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--color-border)]/60">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-semibold text-[var(--foreground)] opacity-40 uppercase tracking-widest">
                        0{idx + 1} · SERVICE
                      </span>
                      {item.badge && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--color-badge-bg)] text-[var(--color-accent)] border border-[var(--color-border)]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Actions: Prev / Next / Close */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="hidden sm:flex items-center bg-[var(--color-badge-bg)] rounded-full p-1 border border-[var(--color-border)]">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1.5 rounded-full hover:bg-[var(--color-surface)] text-[var(--foreground)] opacity-60 hover:opacity-100 transition-all cursor-pointer"
                        title="Precedente"
                        aria-label="Precedente"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1.5 rounded-full hover:bg-[var(--color-surface)] text-[var(--foreground)] opacity-60 hover:opacity-100 transition-all cursor-pointer"
                        title="Successivo"
                        aria-label="Successivo"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className="p-2 sm:p-2.5 rounded-full bg-[var(--color-badge-bg)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--foreground)] opacity-80 hover:opacity-100 transition-all cursor-pointer"
                      title="Chiudi (Esc)"
                      aria-label="Chiudi"
                    >
                      <X className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex flex-col gap-6">
                  {/* Lead Strategy Description */}
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground)] opacity-80 font-normal">
                    {item.fullDesc}
                  </p>

                  {/* Two Columns: Deliverables & Tech Stack */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Column 1: Deliverables checklist */}
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-45">
                        COSA COMPRENDE // DELIVERABLES
                      </span>
                      <ul className="flex flex-col gap-2">
                        {item.deliverables.map((del, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-[13.5px] leading-snug text-[var(--foreground)] opacity-90"
                          >
                            <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-badge-bg)] border border-[var(--color-border)] text-[var(--foreground)]">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Tech Stack Tags */}
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-45">
                        TECNOLOGIE & ARCHITETTURA
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[var(--color-badge-bg)] border border-[var(--color-border)] text-[var(--foreground)] opacity-85"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
