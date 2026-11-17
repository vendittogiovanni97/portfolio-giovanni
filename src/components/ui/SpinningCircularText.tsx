"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface SpinningCircularTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  size?: number;
  duration?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}

export function SpinningCircularText({
  text,
  size = 96,
  duration = 16,
  reverse = false,
  children,
  className = "",
  style,
  ...props
}: SpinningCircularTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathId = useId();

  // Perfectly concentric circle: radius 37 within a 100x100 viewBox
  const radius = 37;
  const center = 50;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none font-mono ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
      aria-label={text}
      {...props}
    >
      {/* Central slot for pulsating status dot or icon */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          {children}
        </div>
      )}

      {/* Rotating SVG ring with exact concentric textPath */}
      <motion.svg
        viewBox="0 0 100 100"
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
        className="w-full h-full pointer-events-none overflow-visible"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text className="font-mono text-[8.2px] font-bold uppercase tracking-[0.18em] fill-[var(--foreground)] opacity-70">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      <span className="sr-only">{text}</span>
    </div>
  );
}
