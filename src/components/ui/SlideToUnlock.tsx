"use client";

import { useRef, useState, useEffect, useCallback, type KeyboardEvent } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { sound } from "@/lib/sound";

interface SlideToUnlockProps {
  onUnlock?: () => void;
  label?: string;
  unlockedLabel?: string;
  downloadUrl?: string;
  downloadName?: string;
  className?: string;
  disabled?: boolean;
}

export function SlideToUnlock({
  onUnlock,
  label = "Scorri per scaricare il CV",
  unlockedLabel = "CV Sbloccato!",
  downloadUrl,
  downloadName = "CV_Giovanni_Venditto.pdf",
  className = "",
  disabled = false,
}: SlideToUnlockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [trackWidth, setTrackWidth] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Measurements
  const handleSize = 48; // px
  const padding = 6; // px
  const maxDrag = Math.max(0, trackWidth - handleSize - padding * 2);

  // Directly bind x to motion value for real-time Framer Motion drag updates
  const x = useMotionValue(0);

  // Visual transforms driven by slider progress
  const progress = useTransform(x, [0, maxDrag || 1], [0, 1]);
  const textOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const progressFill = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Track width measurement via ResizeObserver
  useEffect(() => {
    if (!trackRef.current) return;
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  const triggerDownload = useCallback(() => {
    if (downloadUrl && typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = downloadName;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [downloadUrl, downloadName]);

  const handleUnlockSuccess = useCallback(() => {
    setIsUnlocked(true);
    setIsDragging(false);

    // Smoothly animate handle to the end
    animate(x, maxDrag, { type: "spring", stiffness: 400, damping: 25 });

    // Multi-sensory feedback
    sound.playChime();
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([25, 45, 25]);
    }

    triggerDownload();
    if (onUnlock) onUnlock();

    // Auto-reset after 3.2s
    const timer = setTimeout(() => {
      setIsUnlocked(false);
      animate(x, 0, { type: "spring", stiffness: 450, damping: 28 });
    }, 3200);

    return () => clearTimeout(timer);
  }, [maxDrag, onUnlock, triggerDownload, x]);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (disabled || isUnlocked) return;

    // Threshold: 70% of total travel triggers unlock
    const currentX = x.get();
    if (maxDrag > 0 && currentX >= maxDrag * 0.7) {
      handleUnlockSuccess();
    } else {
      // Elastic snap-back
      sound.playThud();
      animate(x, 0, { type: "spring", stiffness: 450, damping: 28 });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || isUnlocked) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleUnlockSuccess();
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isUnlocked ? 100 : Math.round((x.get() / (maxDrag || 1)) * 100)}
      aria-label={label}
      onKeyDown={handleKeyDown}
      style={{
        boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.2))",
      }}
      className={`relative h-[56px] sm:h-[60px] w-full max-w-md rounded-full border-2 border-[var(--color-border)] bg-[var(--background)] p-[4px] flex items-center select-none overflow-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-hidden touch-none ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
    >
      {/* 1. Track Progress Fill (Active slide feedback) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 rounded-full bg-[var(--color-pill-bg)]/15 dark:bg-[var(--color-pill-bg)]/25"
        style={{ width: progressFill }}
      />

      {/* 2. Shimmering Light Text Beam (Classic iOS slide-to-unlock effect) */}
      <motion.div
        style={{ opacity: isUnlocked ? 0 : textOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center pl-12 pr-4 transition-opacity duration-200"
      >
        <span
          className="font-mono text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] leading-none text-center bg-clip-text text-transparent animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(100,100,100,0.35) 0%, var(--foreground) 50%, rgba(100,100,100,0.35) 100%)",
            backgroundSize: "200% 100%",
          }}
        >
          {label}
        </span>
      </motion.div>

      {/* 3. Unlocked Success Confirmation */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-emerald-500 font-bold font-mono text-xs sm:text-sm uppercase tracking-wider"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{unlockedLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Draggable Thumb Handle */}
      <motion.div
        ref={handleRef}
        drag={isUnlocked || disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          sound.playPop();
        }}
        onDragEnd={handleDragEnd}
        data-cursor="drag"
        data-sound-custom="true"
        style={{
          x: reduce ? (isUnlocked ? maxDrag : 0) : x,
        }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 20 },
        }}
        whileTap={{
          scale: 0.96,
        }}
        className={`relative z-10 h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-[var(--color-border)] shadow-md transition-colors duration-200 touch-none ${
          isUnlocked
            ? "bg-emerald-500 text-white border-emerald-600"
            : isDragging
            ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
            : "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]"
        }`}
      >
        {isUnlocked ? (
          <Check className="w-5 h-5 stroke-[3] animate-in zoom-in-75 duration-200" />
        ) : (
          <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
        )}

        <span className="sr-only">Slide to unlock</span>
      </motion.div>
    </div>
  );
}
