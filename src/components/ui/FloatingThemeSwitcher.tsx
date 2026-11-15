"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

export type ThemeId = "white" | "oat" | "blue" | "lime" | "purple";

interface ThemeOption {
  id: ThemeId;
  name: string;
  bgPreview: string;
  accentPreview: string;
}

const THEMES: ThemeOption[] = [
  {
    id: "white",
    name: "Classic White",
    bgPreview: "#ffffff",
    accentPreview: "#1c1c1c",
  },
  {
    id: "oat",
    name: "Oat & Orange",
    bgPreview: "#ede6d3",
    accentPreview: "#ff7906",
  },
  {
    id: "blue",
    name: "Cyber Blue",
    bgPreview: "#0779ff",
    accentPreview: "#ffea00",
  },
  {
    id: "lime",
    name: "Acid Lime",
    bgPreview: "#0d1012",
    accentPreview: "#d4ff00",
  },
  {
    id: "purple",
    name: "Midnight Punch",
    bgPreview: "#3c0350",
    accentPreview: "#ff7906",
  },
];

function subscribe() {
  return () => {};
}

export function FloatingThemeSwitcher() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "white";
    const saved = localStorage.getItem("portfolio-theme") as ThemeId;
    return THEMES.some((t) => t.id === saved) ? saved : "white";
  });

  const [isOpen, setIsOpen] = useState(false);

  const selectTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  };

  if (!mounted) return null;

  return (
    <aside aria-label="Palette switcher" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 24,
            }}
            className="flex items-center gap-2 rounded-full p-2 shadow-2xl backdrop-blur-md border border-neutral-200/80 bg-white/95 text-neutral-900"
          >
            {THEMES.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTheme(t.id)}
                  title={t.name}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-transform active:scale-90 hover:scale-110 cursor-pointer ${
                    isSelected ? "ring-2 ring-black ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: t.bgPreview }}
                  aria-label={`Tema ${t.name}`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: t.accentPreview }}
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold drop-shadow-xs">
                      <Check className="h-4 w-4 stroke-[3]" style={{ color: t.id === "white" || t.id === "oat" ? "#111" : "#fff" }} />
                    </span>
                  )}
                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {t.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating trigger pill */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex h-13 w-13 items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.18)] border-2 border-black/10 bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Apri selettore palette colori"
        title="Cambia palette tema"
      >
        <Palette
          className={`h-6 w-6 transition-transform duration-500 ${
            isOpen ? "rotate-90 scale-110" : "group-hover:rotate-12"
          }`}
        />
      </button>
    </aside>
  );
}
