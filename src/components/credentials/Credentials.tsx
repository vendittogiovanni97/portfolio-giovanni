"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Award, GraduationCap, Code2, X, ZoomIn, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n";

interface CertificateItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  image: string;
}

const ANTHROPIC_CERTS: CertificateItem[] = [
  {
    id: "claude-101",
    year: "2026",
    title: "Claude 101",
    issuer: "Anthropic",
    image: "/certificates/claude-101.png",
  },
  {
    id: "claude-code-101",
    year: "2026",
    title: "Claude Code 101",
    issuer: "Anthropic",
    image: "/certificates/claude-code-101.png",
  },
  {
    id: "claude-platform-101",
    year: "2026",
    title: "Claude Platform 101",
    issuer: "Anthropic",
    image: "/certificates/claude-platform-101.png",
  },
  {
    id: "claude-cowork",
    year: "2026",
    title: "Claude Cowork",
    issuer: "Anthropic",
    image: "/certificates/claude-cowork.png",
  },
];

const ACADEMIC_PATH = [
  {
    id: "link-campus",
    year: "2025",
    title: "Full Stack Developer",
    institution: "Università degli Studi Link Campus",
    type: "Percorso Universitario",
    icon: GraduationCap,
  },
  {
    id: "nexus-pozzuoli",
    year: "2025",
    title: "Frontend Developer",
    institution: "Corso Professionalizzante · Nexus Pozzuoli",
    type: "Specializzazione",
    icon: Code2,
  },
];

export function Credentials() {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<{ title: string; image: string } | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="credentials" className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
              Verified Badges
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[var(--foreground)]">
              {t.credentials.title}
            </h2>
            <p className="mt-3 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium">
              {t.credentials.subtitle}
            </p>
          </div>
        </div>

        {/* 1. Official Anthropic Banner */}
        <div
          className="mb-8 p-6 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-transform hover:scale-[1.01]"
          style={{
            boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.25))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shrink-0 shadow-md">
              <Award className="w-7 h-7 text-[var(--color-accent)]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[18px] sm:text-[20px] font-bold text-[var(--foreground)]">
                  {t.credentials.anthropicBadge}
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  Ufficiale
                </span>
              </div>
              <p className="text-[14.5px] text-[var(--foreground)] opacity-75 mt-1 font-medium">
                {t.credentials.anthropicSpotlight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>4 Certificati verificati 2026</span>
          </div>
        </div>

        {/* 2. Anthropic Certs Collectible Badge Deck (4 equal sticker cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ANTHROPIC_CERTS.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="group rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-4 flex flex-col justify-between"
              style={{
                boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.2))",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedImage({ title: cert.title, image: cert.image })}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[var(--background)] border border-[var(--color-border)] mb-4 cursor-pointer"
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="btn-elastic inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-accent)] text-xs font-bold uppercase tracking-wider text-[var(--color-accent-contrast)] shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 stroke-[2.5]" />
                    Ingrandisci
                  </span>
                </div>
              </button>

              <div className="px-1">
                <div className="flex items-center justify-between text-[11.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-1">
                  <span>{cert.issuer}</span>
                  <span>{cert.year}</span>
                </div>
                <h3 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight leading-none">
                  {cert.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Academic & Specialization Path (2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACADEMIC_PATH.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 hover:-translate-y-1 transition-transform duration-300 flex items-start gap-5"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.15))",
                }}
              >
                <div className="p-3.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)]">
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-[var(--foreground)] opacity-60">· {item.year}</span>
                  </div>
                  <h3 className="[font-family:var(--font-display)] uppercase text-2xl text-[var(--foreground)] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[var(--foreground)] opacity-75 mt-1 font-medium">
                    {item.institution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-3xl p-6 shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
                <h3 className="[font-family:var(--font-display)] uppercase text-2xl text-[var(--foreground)]">
                  {selectedImage.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="btn-elastic p-2 rounded-full bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] transition-colors cursor-pointer"
                  aria-label="Chiudi"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
