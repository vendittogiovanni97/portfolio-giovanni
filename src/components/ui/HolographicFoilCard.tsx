"use client";

import { useRef, useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

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

interface HolographicFoilCardProps {
  children: ReactNode;
  className?: string;
  isCenter?: boolean;
  onClick?: () => void;
  dataCursor?: string;
}

export function HolographicFoilCard({
  children,
  className = "",
  isCenter = true,
  onClick,
  dataCursor = "view",
}: HolographicFoilCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useSyncExternalStore(
    subscribePointerCoarse,
    getPointerSnapshot,
    getServerPointerSnapshot
  );
  const reducedMotion = useReducedMotion();

  // Normalized cursor coordinates (0 to 1)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const rawHover = useMotionValue(0);

  // Smooth elastic spring motion (reactive, low damping for responsive feel)
  const springX = useSpring(rawX, { stiffness: 300, damping: 24, mass: 0.45 });
  const springY = useSpring(rawY, { stiffness: 300, damping: 24, mass: 0.45 });
  const springHover = useSpring(rawHover, { stiffness: 340, damping: 28 });

  // 3D Tilt calculation (subtle tilt to keep content completely legible)
  const tiltMax = isCenter ? (reducedMotion ? 0 : 8) : reducedMotion ? 0 : 4;
  const rotateX = useTransform(springY, [0, 1], [tiltMax, -tiltMax]);
  const rotateY = useTransform(springX, [0, 1], [-tiltMax, tiltMax]);

  // Holographic reflection coordinates and angles
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const foilAngle = useTransform(springX, [0, 1], ["110deg", "145deg"]);
  const streakOffset = useTransform(springX, [0, 1], ["-15%", "115%"]);

  // Dynamic gradients via useMotionTemplate (no re-renders, 120 FPS GPU composite)
  const glareBackground = useMotionTemplate`radial-gradient(circle 380px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.12) 32%, transparent 70%)`;
  
  // Prismatic iridescent foil sheen (Spencer Gabor collectible sticker aesthetic)
  const foilBackground = useMotionTemplate`linear-gradient(${foilAngle}, rgba(255, 45, 85, 0.22) 0%, rgba(255, 149, 0, 0.22) 18%, rgba(255, 204, 0, 0.24) 36%, rgba(52, 199, 89, 0.24) 54%, rgba(0, 199, 190, 0.26) 72%, rgba(175, 82, 222, 0.26) 100%)`;

  // Dynamic opacities driven by hover spring
  const glareOpacity = useTransform(
    springHover,
    [0, 1],
    [0, isCenter ? 0.85 : 0.5]
  );
  const foilOpacity = useTransform(
    springHover,
    [0, 1],
    [0, isCenter ? 0.65 : 0.35]
  );
  const streakOpacity = useTransform(
    springHover,
    [0, 1],
    [0, isCenter ? 0.45 : 0.25]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    rawHover.set(1);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    rawHover.set(0);
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full overflow-hidden select-none will-change-transform ${className}`}
    >
      {/* 1. Underlying Project Artwork (Uncropped Image / Poster) */}
      <div className="relative w-full h-full pointer-events-none">
        {children}
      </div>

      {/* 2. Prismatic Holographic Rainbow Sheen (Color Dodge collector foil) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 mix-blend-color-dodge transition-opacity duration-200"
        style={{
          background: foilBackground,
          opacity: isTouch ? 0 : foilOpacity,
        }}
      />

      {/* 3. Specular Spotlight Glare (Follows mouse spotlight) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay dark:mix-blend-screen transition-opacity duration-200"
        style={{
          background: glareBackground,
          opacity: isTouch ? 0 : glareOpacity,
        }}
      />

      {/* 4. Diagonal Foil Specular Streak (Physical Gleam Bar) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-24 w-36 -translate-x-1/2 z-25 rotate-[24deg] mix-blend-soft-light"
        style={{
          left: streakOffset,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.08) 75%, transparent 100%)",
          opacity: isTouch ? 0 : streakOpacity,
        }}
      />

      {/* 5. Tactile Glass Bevel Rim (Subtle physical rim highlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ring-inset ring-white/25 dark:ring-white/15"
      />
    </motion.div>
  );
}
