"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  GraduationCap,
  Code2,
  X,
  ZoomIn,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/i18n";

type FilterTab = "all" | "anthropic" | "academic";

interface CertificateItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  image: string;
  artImage: string;
  skills: string[];
}

const ANTHROPIC_CERTS: CertificateItem[] = [
  {
    id: "claude-101",
    year: "2026",
    title: "Claude 101",
    issuer: "Anthropic",
    image: "/certificates/claude-101.png",
    artImage: "/certificates/art/claude-101-art.png",
    skills: ["Prompt Engineering", "LLM Fundamentals", "In-Context Learning"],
  },
  {
    id: "claude-code-101",
    year: "2026",
    title: "Claude Code 101",
    issuer: "Anthropic",
    image: "/certificates/claude-code-101.png",
    artImage: "/certificates/art/claude-code-101-art.png",
    skills: ["Agentic CLI", "Code Automation", "Terminal Workflows"],
  },
  {
    id: "claude-platform-101",
    year: "2026",
    title: "Claude Platform 101",
    issuer: "Anthropic",
    image: "/certificates/claude-platform-101.png",
    artImage: "/certificates/art/claude-platform-101-art.png",
    skills: ["Anthropic API", "Tool Use & Functions", "Cost & Latency"],
  },
  {
    id: "claude-cowork",
    year: "2026",
    title: "Claude Cowork",
    issuer: "Anthropic",
    image: "/certificates/claude-cowork.png",
    artImage: "/certificates/art/claude-cowork-art.png",
    skills: ["Multi-Agent Collaboration", "Human-in-the-loop", "Workflow Design"],
  },
];

interface AcademicItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  location: string;
  type: string;
  badge: string;
  descKey: "linkCampus" | "nexusPozzuoli";
  monogram: string;
  icon: typeof GraduationCap;
  skills: string[];
}

const ACADEMIC_PATH: AcademicItem[] = [
  {
    id: "link-campus",
    year: "2025",
    title: "Full Stack Developer",
    institution: "Università degli Studi Link Campus",
    location: "Roma / Remoto",
    type: "Percorso Universitario",
    badge: "Specializzazione Accademica",
    descKey: "linkCampus",
    monogram: "LC",
    icon: GraduationCap,
    skills: [
      "Next.js 16",
      "React 19",
      "Node.js",
      "PostgreSQL",
      "Database NoSQL",
      "Architetture Web",
      "CI/CD Agile",
    ],
  },
  {
    id: "nexus-pozzuoli",
    year: "2025",
    title: "Frontend Developer",
    institution: "Nexus Pozzuoli",
    location: "Pozzuoli (NA)",
    type: "Corso Professionalizzante",
    badge: "Ingegneria Frontend",
    descKey: "nexusPozzuoli",
    monogram: "NX",
    icon: Code2,
    skills: [
      "TypeScript",
      "React Ecosystem",
      "Component Architecture",
      "Responsive UX",
      "Tailwind CSS",
      "State Management",
    ],
  },
];

export function Credentials() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const selectedCert = modalIndex !== null ? ANTHROPIC_CERTS[modalIndex] : null;

  const handlePrev = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex - 1 + ANTHROPIC_CERTS.length) % ANTHROPIC_CERTS.length);
  }, [modalIndex]);

  const handleNext = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex + 1) % ANTHROPIC_CERTS.length);
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, handlePrev, handleNext]);

  return (
    <section id="credentials" className="w-full relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-8">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
              {t.credentials.sectionBadge}
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.92] text-[var(--foreground)]">
              {t.credentials.title}
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-[var(--foreground)] opacity-75 max-w-2xl font-medium leading-relaxed">
              {t.credentials.subtitle}
            </p>
          </div>

          {/* Spencer Gabor Interactive Filter Pill Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-sm shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`btn-elastic px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              {t.credentials.all}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("anthropic")}
              className={`btn-elastic px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "anthropic"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              {t.credentials.anthropicTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("academic")}
              className={`btn-elastic px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "academic"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              {t.credentials.academicTab}
            </button>
          </div>
        </div>

        {/* 1. ANTHROPIC CLAUDE CERTIFICATIONS DECK */}
        {(activeTab === "all" || activeTab === "anthropic") && (
          <div className="mb-16">
            {/* Header Stamp Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                    {t.credentials.anthropicBadge}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)] opacity-65 block">
                    {t.credentials.anthropicSpotlight}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                <CheckCircle className="w-3.5 h-3.5 opacity-80" />
                <span>{t.credentials.completedBadge}</span>
              </div>
            </div>

            {/* 4 Collectible Cards Deck (with Spencer Gabor playful subtle rotations) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ANTHROPIC_CERTS.map((cert, idx) => {
                const rotationClass =
                  idx === 0
                    ? "-rotate-1 sm:-rotate-2"
                    : idx === 1
                    ? "rotate-1"
                    : idx === 2
                    ? "-rotate-1"
                    : "rotate-1 sm:rotate-2";

                return (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className={`group relative rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-4 flex flex-col justify-between transition-transform duration-300 ${rotationClass} hover:rotate-0`}
                    style={{
                      boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.2))",
                    }}
                  >
                    {/* Top card metadata */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-[var(--foreground)] opacity-60">
                        {cert.year}
                      </span>
                    </div>

                    {/* Preview Image Frame: Spencer Gabor Custom Sticker Artwork */}
                    <button
                      type="button"
                      onClick={() => setModalIndex(idx)}
                      data-cursor="zoom"
                      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[var(--color-border)] mb-4 cursor-pointer group-hover:shadow-md transition-shadow bg-[var(--color-surface-muted)]"
                      aria-label={`Visualizza ${cert.title}`}
                    >
                      <Image
                        src={cert.artImage}
                        alt={cert.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="btn-elastic inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] text-xs font-bold uppercase tracking-wider shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5 stroke-[2.5]" />
                          {t.credentials.enlarge}
                        </span>
                      </div>
                    </button>

                    {/* Title & Skills */}
                    <div className="px-1 pt-1">
                      <h4 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight leading-tight mb-2">
                        {cert.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)] opacity-80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. ACADEMIC & SPECIALIZATION FOUNDATIONS */}
        {(activeTab === "all" || activeTab === "academic") && (
          <div>
            {/* Header Stamp Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                {t.credentials.academicSectionTitle}
              </h3>
            </div>

            {/* 2 Prominent Full-Width Academic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACADEMIC_PATH.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between"
                    style={{
                      boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.2))",
                    }}
                  >
                    <div>
                      {/* Top Bar with Monogram & Badges */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] flex items-center justify-center font-mono font-black text-sm shadow-sm shrink-0">
                            {item.monogram}
                          </div>
                          <div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 block">
                              {item.institution}
                            </span>
                            <span className="text-xs font-semibold text-[var(--foreground)] opacity-75">
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                          {item.year}
                        </span>
                      </div>

                      {/* Title & Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)] opacity-85 mb-2">
                          <Icon className="w-3.5 h-3.5 opacity-70" />
                          {t.credentials.academicBadges[item.descKey]}
                        </span>
                        <h4 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight leading-none">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-[14.5px] text-[var(--foreground)] opacity-80 leading-relaxed font-medium mb-6">
                        {t.studio.educationDesc[item.descKey]}
                      </p>
                    </div>

                    {/* Skill Tag Cloud */}
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-55 block mb-2">
                        {t.credentials.skillsTitle}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Spencer Gabor Interactive Lightbox Modal with Prev/Next Navigation */}
      <AnimatePresence>
        {selectedCert && modalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-2xl cursor-default flex flex-col"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-5 border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                    {modalIndex + 1} / {ANTHROPIC_CERTS.length}
                  </span>
                  <div>
                    <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight leading-none">
                      {selectedCert.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)] opacity-60">
                      {selectedCert.issuer} · {t.credentials.verifiedStamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn-elastic p-2 rounded-full border border-[var(--color-border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
                    aria-label={t.credentials.prevAria}
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-elastic p-2 rounded-full border border-[var(--color-border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
                    aria-label={t.credentials.nextAria}
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setModalIndex(null)}
                    className="btn-elastic p-2 rounded-full border border-[var(--color-border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer ml-1"
                    aria-label={t.credentials.closeAria}
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-[var(--color-border)] mb-4">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="90vw"
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Modal Footer Skills */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <span className="font-mono text-[11px] text-[var(--foreground)] opacity-55">
                  {t.credentials.keyboardHint}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
