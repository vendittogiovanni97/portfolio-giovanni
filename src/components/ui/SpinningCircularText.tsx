"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface SpinningCircularTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  charSpacing?: number;
  fontSize?: string;
  duration?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}

export function SpinningCircularText({
  text,
  charSpacing = 1.1,
  fontSize = "11px",
  duration = 14,
  reverse = false,
  children,
  className = "",
  style,
  ...props
}: SpinningCircularTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const chars = text.split("");
  const charCount = chars.length;
  const innerAngle = (360 / charCount) * (Math.PI / 180);
  const radiusFactor = charSpacing / Math.sin(innerAngle);
  // Radius in pixels based on approx 8.5px char width for monospace 11px font
  const radiusPx = Math.round(radiusFactor * 4.2);
  const containerSizePx = radiusPx * 2 + 36;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none font-mono font-bold uppercase tracking-wider ${className}`}
      style={{
        width: `${containerSizePx}px`,
        height: `${containerSizePx}px`,
        ...style,
      }}
      aria-label={text}
      {...props}
    >
      {/* Central Slot for Badge Icon / Pulsing Dot */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          {children}
        </div>
      )}

      {/* Rotating Ring of Characters */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: reverse ? -360 : 360,
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {chars.map((char, index) => {
          const charAngle = (360 / charCount) * index;
          return (
            <span
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-70"
              style={{
                fontSize,
                transform: `translate(-50%, -50%) rotate(${charAngle}deg) translateY(-${radiusPx}px)`,
                transformOrigin: "center center",
              }}
            >
              {char}
            </span>
          );
        })}
      </motion.div>

      {/* Accessible Screen Reader Text */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
