"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

export interface TextSwapProps {
  texts: string[];
  interval?: number;
  className?: string;
  pauseOnHover?: boolean;
  as?: React.ElementType;
}

export function TextSwap({
  texts,
  interval = 3200,
  className = "",
  pauseOnHover = true,
  as: Component = "span",
}: TextSwapProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Find longest text to use as zero-CLS invisible sizer
  const longestText = React.useMemo(() => {
    if (!texts || texts.length === 0) return "";
    return texts.reduce((a, b) => (a.length > b.length ? a : b), "");
  }, [texts]);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;

    // Pause timer if tab is hidden in background
    let timerId: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        if (!isPaused && !document.hidden) {
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }, interval);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerId) clearInterval(timerId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [texts, interval, isPaused]);

  if (!texts || texts.length === 0) return null;

  const currentText = texts[index % texts.length];

  // Motion variants with downward waterfall translation & optical blur
  const variants: Variants = {
    initial: {
      y: shouldReduceMotion ? 0 : "-0.32em",
      opacity: 0,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: shouldReduceMotion ? 0 : "0.32em",
      opacity: 0,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.38,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component
      className={`inline-grid grid-cols-1 grid-rows-1 items-center justify-items-center relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Zero-CLS Ghost Sizer: Always present in col 1, row 1 to reserve exact max dimensions */}
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 invisible select-none pointer-events-none opacity-0"
      >
        {longestText}
      </span>

      {/* Animated Text: Stacks in col 1, row 1 with waterfall swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${index}-${currentText}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: "transform, opacity, filter" }}
          className="col-start-1 row-start-1 block whitespace-nowrap"
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
}
