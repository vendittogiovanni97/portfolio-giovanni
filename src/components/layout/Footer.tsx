"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-black/[0.08] mt-24 bg-[#f5f4f2] text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#151515] text-[11px] font-bold text-white">
            GV
          </span>
          <span className="text-[13.5px] font-semibold text-[#111111]">
            {config.authorName}
          </span>
          <span className="text-xs text-neutral-400">· Fullstack Engineer</span>
        </div>

        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} {config.authorName}. Built with Taste Skill.
        </p>
      </div>
    </footer>
  );
}
