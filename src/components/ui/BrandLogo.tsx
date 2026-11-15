"use client";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "w-7 h-7" }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" fill="#ffffff" stroke="#181818" strokeWidth="6" />
      <path d="M 32 50 C 32 30, 88 30, 88 50 Z" fill="var(--color-accent)" stroke="#181818" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 26 50 C 32 46, 88 46, 94 50 C 94 54, 26 54, 26 50 Z" fill="#181818" />
      <path d="M 36 50 C 36 78, 84 78, 84 50" fill="#ffffff" stroke="#181818" strokeWidth="5" strokeLinecap="round" />
      <circle cx="47" cy="60" r="8.5" fill="#ffffff" stroke="#181818" strokeWidth="4.5" />
      <circle cx="48" cy="60" r="2.5" fill="#181818" />
      <circle cx="73" cy="60" r="8.5" fill="#ffffff" stroke="#181818" strokeWidth="4.5" />
      <circle cx="72" cy="60" r="2.5" fill="#181818" />
      <path d="M 55.5 60 C 58 58, 62 58, 64.5 60" fill="none" stroke="#181818" strokeWidth="4" strokeLinecap="round" />
      <path d="M 50 74 C 55 79, 65 79, 70 74" fill="none" stroke="#181818" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="39" cy="69" r="3" fill="var(--color-accent)" opacity="0.85" />
      <circle cx="81" cy="69" r="3" fill="var(--color-accent)" opacity="0.85" />
      <path d="M 36 56 C 32 56, 32 64, 36 64" fill="#ffffff" stroke="#181818" strokeWidth="4" strokeLinecap="round" />
      <path d="M 84 56 C 88 56, 88 64, 84 64" fill="#ffffff" stroke="#181818" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
