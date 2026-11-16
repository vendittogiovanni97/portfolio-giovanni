"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorMode = "default" | "pointer" | "view" | "drag" | "zoom" | "copy";

function subscribePointerCoarse(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: coarse) and (hover: none)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse) and (hover: none)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

export function CreativeCursor() {
  const reducedMotion = useReducedMotion();
  const isTouch = useSyncExternalStore(
    subscribePointerCoarse,
    getPointerSnapshot,
    getServerPointerSnapshot
  );
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Elastic smooth spring physics
  const springConfig = { damping: 26, stiffness: 420, mass: 0.4 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Contextual inspection of element under cursor
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='button'], input, textarea, select"
      ) as HTMLElement | null;

      if (!target) {
        setMode("default");
        return;
      }

      const explicitMode = target.dataset.cursor as CursorMode | undefined;
      if (explicitMode) {
        setMode(explicitMode);
        return;
      }

      // Check context based on parent sections
      if (target.closest("#work") && (target.tagName === "DIV" || target.tagName === "IMG" || target.tagName === "A")) {
        setMode("view");
      } else if (target.closest(".perspective-1000") || target.hasAttribute("draggable")) {
        setMode("drag");
      } else if (target.tagName === "A" || target.tagName === "BUTTON" || target.getAttribute("role") === "button") {
        setMode("pointer");
      } else {
        setMode("default");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setMode("default");
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouch, isVisible, rawX, rawY, reducedMotion]);

  if (isTouch || reducedMotion) {
    return null;
  }

  // Label text based on active contextual mode
  let label = "";
  if (mode === "view") label = "VIEW ↗";
  else if (mode === "drag") label = "DRAG ↔";
  else if (mode === "zoom") label = "ZOOM 🔍";
  else if (mode === "copy") label = "COPY 📋";

  const isExpanded = mode === "view" || mode === "drag" || mode === "zoom" || mode === "copy";

  return (
    <motion.div
      id="creative-cursor"
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none will-change-transform"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isMouseDown ? 0.9 : 1,
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{
          width: isExpanded ? 88 : mode === "pointer" ? 34 : 16,
          height: isExpanded ? 32 : mode === "pointer" ? 34 : 16,
          borderRadius: 9999,
          backgroundColor:
            mode === "pointer"
              ? "var(--color-pill-bg)"
              : isExpanded
              ? "var(--color-pill-bg)"
              : "var(--color-pill-bg)",
          boxShadow: isExpanded
            ? "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.25))"
            : mode === "pointer"
            ? "0 4px 12px rgba(0,0,0,0.18)"
            : "0 2px 6px rgba(0,0,0,0.2)",
          opacity: mode === "pointer" ? 0.75 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
        }}
        className="flex items-center justify-center overflow-hidden border border-white/20 backdrop-blur-xs text-[var(--color-pill-text)]"
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.12 }}
            className="font-mono text-[10.5px] font-black tracking-wider uppercase whitespace-nowrap px-2"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
