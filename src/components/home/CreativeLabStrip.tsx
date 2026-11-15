"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { ArrowUpRight, Cpu, Eye, Sparkles } from "lucide-react";

export function CreativeLabStrip() {
  const { href } = useI18n();

  return (
    <section id="lab" className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-[var(--color-border)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
              R&D & Engineering Demos
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[var(--foreground)]">
              Creative Lab
            </h2>
            <p className="mt-3 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium">
              Esperimenti interattivi, pipeline OCR con LLM in tempo reale e simulazioni grafiche WebGL.
            </p>
          </div>

          <Link
            href={href("/lab")}
            className="btn-elastic inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] text-[13px] font-bold uppercase tracking-wider shadow-md shrink-0"
          >
            <span>Apri il Lab Completo</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* 2 Flagship Interactive Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: OCR Simulator */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-8 flex flex-col justify-between"
            style={{
              boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.25))",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                  <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                  Live Simulator
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50">
                  Anthropic Claude & OCR
                </span>
              </div>

              <h3 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight mb-3">
                Pipeline OCR & Estrazione Dati
              </h3>
              <p className="text-[var(--foreground)] opacity-75 text-[15px] sm:text-[16px] font-medium leading-relaxed mb-6">
                Simulatore interattivo di parsing contratti e polizze: elaborazione OCR, confidenza semantica &gt;99% e strutturazione schema JSON con LLM Claude.
              </p>
            </div>

            <div className="pt-5 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[var(--foreground)] opacity-60">
                180ms · Zero Data Loss
              </span>
              <Link
                href={href("/lab")}
                className="btn-elastic inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-xs"
              >
                <span>Testa nel Lab</span>
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: WebGL & Three.js Canvas */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-8 flex flex-col justify-between"
            style={{
              boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.25))",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                  <Cpu className="w-3 h-3 text-[var(--color-accent)]" />
                  WebGL Engine
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50">
                  Three.js & Custom Shaders
                </span>
              </div>

              <h3 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight mb-3">
                Shader Fluido & Particellare
              </h3>
              <p className="text-[var(--foreground)] opacity-75 text-[15px] sm:text-[16px] font-medium leading-relaxed mb-6">
                Core grafico interattivo a 60fps alimentato da Three.js, calcolo perlin noise procedurale e deformazione mesh sensibile al cursore del mouse.
              </p>
            </div>

            <div className="pt-5 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-500">
                60 FPS · Hardware Accelerated
              </span>
              <Link
                href={href("/lab")}
                className="btn-elastic inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-xs"
              >
                <span>Esplora Shaders</span>
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
