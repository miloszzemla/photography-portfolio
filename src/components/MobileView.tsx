"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photos";
import { MobileFilmstrip } from "./MobileFilmstrip";
import Image from "next/image";

interface MobileViewProps {
  currentIndex: number;
  currentPhoto: Photo;
  total: number;
  onSelect: (index: number) => void;
}

export function MobileView({ currentIndex, currentPhoto, total, onSelect }: MobileViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-800">
            Milosz Zemla
          </span>
          <span className="text-neutral-300 font-mono text-[10px]">+</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            View Work
          </span>
          <div className="w-5 h-4 flex flex-col justify-center gap-[3px]">
            <div className="w-full h-[1.5px] bg-neutral-800" />
            <div className="w-full h-[1.5px] bg-neutral-800" />
          </div>
        </div>
      </div>

      {/* Location + counter */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Location:
          </span>
          <span className="font-sans text-sm font-semibold text-neutral-800">
            {currentPhoto.location}
          </span>
        </div>
        <span className="font-mono text-[11px] text-neutral-500 mt-2">
          ({currentIndex + 1}/{total})
        </span>
      </div>

      {/* Main photo */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 relative overflow-hidden">
        {/* Viewfinder brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative" style={{ width: 40, height: 28 }}>
            <div className="absolute left-0 top-0 w-2 h-full border-l border-t border-b border-neutral-400" />
            <div className="absolute right-0 top-0 w-2 h-full border-r border-t border-b border-neutral-400" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.location}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip — irregular sizes */}
      <div className="py-2">
        <MobileFilmstrip currentIndex={currentIndex} onSelect={onSelect} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
        <span>&copy;2026</span>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">M.Z.</span>
          <span>Photographer</span>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
