"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Award, GraduationCap, Code2, X, ZoomIn, Sparkles, CheckCircle2 } from "lucide-react";
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
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
          <div>
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]">
              {t.credentials.title}
            </h2>
            <p className="mt-1.5 text-neutral-600 text-[15px] sm:text-[16px] max-w-lg">
              {t.credentials.subtitle}
            </p>
          </div>
        </div>

        {/* 1. Official Anthropic Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl card-elevation-subtle flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-black/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#111111] text-white shrink-0 shadow-xs">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-semibold text-[#111111]">
                  {t.credentials.anthropicBadge}
                </span>
                <span className="text-[11.5px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Ufficiale
                </span>
              </div>
              <p className="text-[14px] text-neutral-600 mt-0.5">
                {t.credentials.anthropicSpotlight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>4 Certificati verificati nel 2026</span>
          </div>
        </div>

        {/* 2. Anthropic Certs Grid (4 equal clean cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {ANTHROPIC_CERTS.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl card-elevation-high p-4 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => setSelectedImage({ title: cert.title, image: cert.image })}
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#f5f4f2] border border-black/[0.06] mb-4 cursor-pointer"
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#111111] shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Ingrandisci
                  </span>
                </div>
              </button>

              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span>{cert.issuer}</span>
                  <span>{cert.year}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#111111] tracking-tight">
                  {cert.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Academic & Specialization Path (2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ACADEMIC_PATH.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-2xl card-elevation-subtle p-6 hover:-translate-y-1 hover:border-black/20 transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#111111] text-white shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-neutral-600 px-2.5 py-0.5 rounded-full bg-[#f5f4f2]">
                      {item.type}
                    </span>
                    <span className="text-xs text-neutral-400">· {item.year}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#111111] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-neutral-600 mt-0.5">
                    {item.institution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Certificate Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl z-10 p-4 border border-black/10"
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/[0.08]">
                <h4 className="text-base font-semibold text-[#111111]">{selectedImage.title}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-[16/11] w-full bg-[#f5f4f2] rounded-xl overflow-hidden">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  sizes="90vw"
                  className="object-contain p-2"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
