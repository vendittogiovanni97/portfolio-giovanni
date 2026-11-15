"use client";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "w-7 h-7" }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="var(--color-pill-bg)" />
      <path
        d="M 32 14 C 22.059 14 14 22.059 14 32 C 14 41.941 22.059 50 32 50 C 39.5 50 45.8 45.5 48.5 39 L 41 39 C 39 42.5 35.8 44.5 32 44.5 C 25.1 44.5 19.5 38.9 19.5 32 C 19.5 25.1 25.1 19.5 32 19.5 C 36 19.5 39.5 21.5 41.5 25 L 49 20 C 45 16 38.8 14 32 14 Z"
        fill="var(--color-pill-text)"
      />
      <path d="M 32 28 L 44 48 L 50 48 L 38 28 Z" fill="var(--color-accent)" />
      <circle cx="45" cy="22" r="3.5" fill="var(--color-accent)" />
    </svg>
  );
}
