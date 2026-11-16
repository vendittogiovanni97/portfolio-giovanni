"use client";

import { useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { BookOpen, CheckCircle, Award, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n";
import { sound } from "@/lib/sound";

interface FoldablePassportProps {
  onOpenCertificateModal?: (index: number) => void;
  className?: string;
}

export function FoldablePassport({
  onOpenCertificateModal,
  className = "",
}: FoldablePassportProps) {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  // Progress 0 (Closed) to 1 (Fully Open 180deg)
  const [isOpen, setIsOpen] = useState(false);
  const rawProgress = useMotionValue(0);
  const progressSpring = useSpring(rawProgress, { stiffness: 220, damping: 26, mass: 0.6 });

  // 3D Rotation of the front cover (-180deg when fully open)
  const coverRotateY = useTransform(progressSpring, [0, 1], [0, -180]);
  
  // Dynamic spine shadow cast onto right page during rotation
  const spineShadowOpacity = useTransform(progressSpring, [0, 0.5, 1], [0, 0.45, 0.08]);

  // Center alignment offset: keeps single closed book centered (shifted -25%), and open spread centered (0%)
  const containerOffset = useTransform(progressSpring, [0, 1], ["-25%", "0%"]);

  const toggleBooklet = () => {
    const next = !isOpen;
    setIsOpen(next);
    rawProgress.set(next ? 1 : 0);
    if (next) {
      sound.playPop();
    } else {
      sound.playThud();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    rawProgress.set(val);
    if (val >= 0.5 && !isOpen) setIsOpen(true);
    if (val < 0.5 && isOpen) setIsOpen(false);
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto flex flex-col items-center select-none py-6 ${className}`}>
      
      {/* 1. Header & Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)] opacity-60 block mb-1">
            {t.passport.badge}
          </span>
          <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight">
            {t.passport.title}
          </h3>
          <p className="font-mono text-xs text-[var(--foreground)] opacity-70 mt-1 max-w-md">
            {t.passport.subtitle}
          </p>
        </div>

        {/* Action Toggle Button */}
        <button
          type="button"
          onClick={toggleBooklet}
          data-sound-custom="true"
          className="btn-elastic inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
          style={{
            boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.22))",
          }}
        >
          <BookOpen className="w-4 h-4 stroke-[2.5]" />
          <span>{isOpen ? t.passport.closeBooklet : t.passport.openBooklet}</span>
        </button>
      </div>

      {/* 2. 3D Perspective Booklet Arena */}
      <div
        style={{ perspective: 1800 }}
        className="relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[510px] py-4 overflow-visible"
      >
        <motion.div
          style={{
            x: reduce ? (isOpen ? "0%" : "-25%") : containerOffset,
          }}
          className="relative w-[600px] sm:w-[680px] md:w-[720px] h-[430px] sm:h-[480px] flex items-center justify-center will-change-transform"
        >
          {/* HINGED COVER (Hinged at center spine left: 50%, width: 50%) */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "50%",
              transformOrigin: "left center",
              rotateY: reduce ? (isOpen ? -180 : 0) : coverRotateY,
              transformStyle: "preserve-3d",
              zIndex: 20,
            }}
            className="shadow-2xl will-change-transform"
          >
            {/* A. FRONT COVER (Visible when closed, face up on right side) */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              onClick={toggleBooklet}
              data-cursor="view"
              className="absolute inset-0 rounded-2xl sm:rounded-3xl border-[2.5px] border-[#CAA456]/60 bg-[#141414] text-[#F3ECE0] p-6 flex flex-col justify-between cursor-pointer overflow-hidden shadow-2xl"
            >
              {/* Gold foil borders & guilloché corner flourishes */}
              <div className="pointer-events-none absolute inset-2 rounded-xl sm:rounded-2xl border border-[#CAA456]/30" />

              {/* Top Passport Emblems */}
              <div className="flex flex-col items-center text-center mt-2">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-[#CAA456] opacity-90">
                  {t.passport.republic}
                </span>
                <span className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[#F3ECE0] tracking-wider mt-1">
                  PASSPORT
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#CAA456] opacity-75">
                  {t.passport.officialBadge}
                </span>
              </div>

              {/* Center Guilloché Rosette Seal */}
              <div className="my-auto flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#CAA456]/60 flex items-center justify-center p-2 bg-[#CAA456]/5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#CAA456] flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#CAA456]" />
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.25em] text-[#CAA456] mt-3">
                  ACCREDITED · 2026
                </span>
              </div>

              {/* Bottom Holder Info */}
              <div className="border-t border-[#CAA456]/30 pt-3 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#CAA456]/70 block">
                    BEARER / TITOLARE
                  </span>
                  <span className="[font-family:var(--font-display)] uppercase text-base text-[#F3ECE0] tracking-tight">
                    GIOVANNI VENDITTO
                  </span>
                </div>
                <div className="w-7 h-5 border border-[#CAA456]/60 rounded-sm flex items-center justify-center">
                  <span className="font-mono text-[8px] font-bold text-[#CAA456]">CHIP</span>
                </div>
              </div>
            </div>

            {/* B. INSIDE LEFT PAGE (Visible when folded open at -180deg) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 rounded-l-2xl sm:rounded-l-3xl border-2 border-r-0 border-[var(--color-border)] bg-[#FDFBF7] dark:bg-[#181818] text-[var(--foreground)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="border-b border-[var(--color-border)] pb-2 flex items-center justify-between">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest opacity-60">
                  {t.passport.biometrics}
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>ITA-2026</span>
                </span>
              </div>

              {/* Identity & Photo Area */}
              <div className="flex gap-4 items-start my-auto">
                {/* Official Stamp Avatar Frame */}
                <div className="w-20 sm:w-24 aspect-[3/4] rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-1 shrink-0 flex flex-col items-center justify-center shadow-xs">
                  <div className="w-full h-full rounded-lg bg-[var(--color-surface-muted)] flex flex-col items-center justify-center text-center p-1">
                    <span className="[font-family:var(--font-display)] text-2xl font-bold opacity-80">GV</span>
                    <span className="font-mono text-[7.5px] uppercase font-bold opacity-60 mt-1">OFFICIAL</span>
                  </div>
                </div>

                {/* Metadata Fields */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider opacity-50 block">COGNOME / SURNAME</span>
                    <span className="font-mono text-[11px] font-bold uppercase block leading-tight">VENDITTO</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider opacity-50 block">NOME / GIVEN NAME</span>
                    <span className="font-mono text-[11px] font-bold uppercase block leading-tight">GIOVANNI</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider opacity-50 block">RUOLO / SPECIALIZATION</span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block leading-tight truncate">
                      FULLSTACK & AI-READY
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider opacity-50 block">SEDE / NATIONALITY</span>
                    <span className="font-mono text-[10px] opacity-80 block leading-tight">NAPOLI, ITALIA</span>
                  </div>
                </div>
              </div>

              {/* Academic Stamps Block */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-2.5 space-y-1">
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider opacity-60 block">
                  {t.passport.academicStamps}
                </span>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold truncate">LINK CAMPUS UNIV.</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">2025</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold truncate">NEXUS POZZUOLI</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">2025</span>
                </div>
              </div>

              {/* Machine Readable MRZ Zone */}
              <div className="border-t border-[var(--color-border)] pt-2 font-mono text-[8px] sm:text-[9px] tracking-widest opacity-45 truncate select-none">
                P&lt;ITAVENDITTO&lt;&lt;GIOVANNI&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                <br />
                20260908&lt;5ITA9701017M2601019&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
              </div>
            </div>
          </motion.div>

          {/* FIXED RIGHT BASE PAGE (Sits at left: 50%, covered when closed, revealed when open) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "50%",
              zIndex: 10,
            }}
            className="rounded-r-2xl sm:rounded-r-3xl border-2 border-l-0 border-[var(--color-border)] bg-[#FDFBF7] dark:bg-[#181818] text-[var(--foreground)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Dynamic Spine Crease Shadow */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: spineShadowOpacity }}
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent z-30"
            />

            {/* Header */}
            <div className="border-b border-[var(--color-border)] pb-2 flex items-center justify-between">
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest opacity-60">
                {t.passport.aiVisas}
              </span>
              <span className="font-mono text-[10px] font-bold text-amber-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>ANTHROPIC 101</span>
              </span>
            </div>

            {/* 4 Official Anthropic Visa Entry Stamps */}
            <div className="grid grid-cols-2 gap-2.5 my-auto">
              {[
                { title: "CLAUDE 101", sub: "Prompt Eng.", code: "LLM-OK", index: 0 },
                { title: "CLAUDE CODE", sub: "Agentic CLI", code: "CLI-OK", index: 1 },
                { title: "PLATFORM 101", sub: "API Tools", code: "API-OK", index: 2 },
                { title: "COWORK", sub: "Human-in-Loop", code: "COW-OK", index: 3 },
              ].map((visa) => (
                <div
                  key={visa.title}
                  onClick={() => onOpenCertificateModal && onOpenCertificateModal(visa.index)}
                  className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/70 p-2.5 flex flex-col justify-between h-[96px] sm:h-[105px] cursor-pointer hover:border-amber-500 hover:scale-102 transition-all shadow-xs"
                  title="Clicca per ingrandire il certificato originale"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      {visa.code}
                    </span>
                    <Award className="w-3.5 h-3.5 opacity-60" />
                  </div>
                  <div>
                    <h5 className="[font-family:var(--font-display)] text-[12px] sm:text-[13px] uppercase tracking-tight leading-tight">
                      {visa.title}
                    </h5>
                    <span className="font-mono text-[8.5px] opacity-65 block">{visa.sub}</span>
                  </div>
                  <span className="font-mono text-[8px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    {t.passport.verified}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Callout Button */}
            <button
              type="button"
              onClick={() => onOpenCertificateModal && onOpenCertificateModal(0)}
              className="btn-elastic w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[10.5px] font-mono font-bold uppercase tracking-wider hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
            >
              <span>{t.passport.openLightbox}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. Interactive Manual Slider Scrub Control */}
      <div className="w-full max-w-sm mt-4 flex flex-col items-center gap-1.5">
        <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-wider opacity-60">
          <span>{t.passport.closeBooklet}</span>
          <span>{t.passport.dragToOpen}</span>
          <span>{t.passport.openBooklet}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isOpen ? 1 : 0}
          onChange={handleSliderChange}
          aria-label={t.passport.dragToOpen}
          className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-ew-resize accent-[var(--color-accent)] border border-[var(--color-border)]"
        />
      </div>
    </div>
  );
}
