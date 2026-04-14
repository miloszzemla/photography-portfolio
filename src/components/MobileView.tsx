"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photos";
import { photos } from "@/data/photos";
import { MobileFilmstrip } from "./MobileFilmstrip";
import Image from "next/image";

interface MobileViewProps {
  currentIndex: number;
  currentPhoto: Photo;
  total: number;
  onSelect: (index: number) => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "-50%" : "50%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

export function MobileView({ currentIndex, currentPhoto, total, onSelect }: MobileViewProps) {
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(0);

  const goNext = () => {
    if (currentIndex < photos.length - 1) {
      setDirection(1);
      onSelect(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      onSelect(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();  // swipe up = next
      else goPrev();           // swipe down = prev
    }
  };

  return (
    <div className="flex flex-col min-h-svh bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-center px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-neutral-300 font-mono text-[10px]">+</span>
          <span className="text-neutral-800 normal-case tracking-[0.2em] text-[13px] font-light font-mono">
            Milosz Zemla
          </span>
          <span className="text-neutral-300 font-mono text-[10px]">+</span>
        </div>
      </div>

      {/* Location + counter */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Location:
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-sm font-semibold text-neutral-800"
            >
              {currentPhoto.location}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[11px] text-neutral-500 mt-2">
          ({currentIndex + 1}/{total})
        </span>
      </div>

      {/* Main photo — swipeable */}
      <div
        className="flex-1 flex items-center justify-center px-4 py-4 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Viewfinder brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative" style={{ width: 40, height: 28 }}>
            <div className="absolute left-0 top-0 w-2 h-full border-l border-t border-b border-neutral-400" />
            <div className="absolute right-0 top-0 w-2 h-full border-r border-t border-b border-neutral-400" />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
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
