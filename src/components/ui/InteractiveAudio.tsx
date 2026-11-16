"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return sound.getMuted();
}

function getServerSnapshot() {
  return false;
}

export function InteractiveAudioEngine() {
  useEffect(() => {
    // Delegated click listener for tactile acoustic micro-feedback on interactive controls
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "button, a, input, select, textarea, [role='button'], [data-sound='click']"
      );
      if (!target) return;

      // Avoid double clicks on custom elements that already trigger specific sounds
      if (target.getAttribute("data-sound-custom") === "true") return;

      sound.playClick();
    };

    window.addEventListener("click", handleClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}

export function SoundToggle({ className = "" }: { className?: string }) {
  const isMuted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localMuted, setLocalMuted] = useState(isMuted);

  const handleToggle = () => {
    const next = sound.toggleMute();
    setLocalMuted(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      data-sound-custom="true"
      className={`group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.16)] border-2 border-black/10 bg-[var(--color-surface)] text-[var(--foreground)] transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer ${className}`}
      aria-label={localMuted ? "Attiva audio tattile" : "Disattiva audio tattile"}
      title={localMuted ? "Audio Tattile: DISATTIVATO (Clicca per attivare)" : "Audio Tattile: ATTIVO"}
    >
      {localMuted ? (
        <VolumeX className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
      ) : (
        <Volume2 className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-110" />
      )}
    </button>
  );
}
