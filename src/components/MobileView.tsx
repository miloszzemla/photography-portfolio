"use client";

import { useRef, useEffect, useCallback } from "react";
import { useMotionValue, useTransform, motion, animate, type MotionValue } from "framer-motion";
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

export function MobileView({ currentIndex, currentPhoto, total, onSelect }: MobileViewProps) {
  const progress = useMotionValue(currentIndex);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);
  const target = useRef(currentIndex);

  // Sync when thumbnail is tapped
  useEffect(() => {
    target.current = currentIndex;
    animate(progress, currentIndex, { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] });
  }, [currentIndex, progress]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
    touchDelta.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const delta = touchStart.current - e.touches[0].clientY;
    touchDelta.current = delta;
    const sensitivity = 0.003;
    const newTarget = Math.max(0, Math.min(photos.length - 1, currentIndex + delta * sensitivity));
    progress.set(newTarget);
  }, [currentIndex, progress]);

  const handleTouchEnd = useCallback(() => {
    // Snap to nearest
    const snapped = Math.round(progress.get());
    const clamped = Math.max(0, Math.min(photos.length - 1, snapped));
    target.current = clamped;
    animate(progress, clamped, { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] });
    if (clamped !== currentIndex) {
      onSelect(clamped);
    }
  }, [progress, currentIndex, onSelect]);

  return (
    <div
      className="fixed inset-0 flex flex-col bg-white touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-center px-4 pt-4 pb-2 z-20">
        <div className="flex items-center gap-3">
          <span className="text-neutral-300 font-mono text-[10px]">+</span>
          <span className="text-neutral-800 normal-case tracking-[0.2em] text-[13px] font-light font-mono">
            Milosz Zemla
          </span>
          <span className="text-neutral-300 font-mono text-[10px]">+</span>
        </div>
      </div>

      {/* Location + counter */}
      <div className="flex items-start justify-between px-4 pt-2 pb-2 z-20">
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

      {/* Main photo — same continuous filmstrip as desktop */}
      <div className="flex-1 relative overflow-hidden mx-4">
        {/* Viewfinder brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative" style={{ width: 40, height: 28 }}>
            <div className="absolute left-0 top-0 w-2 h-full border-l border-t border-b border-neutral-400" />
            <div className="absolute right-0 top-0 w-2 h-full border-r border-t border-b border-neutral-400" />
          </div>
        </div>

        {photos.map((photo, i) => (
          <MobilePhotoSlide key={photo.id} photo={photo} index={i} progress={progress} />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="py-2 z-20">
        <MobileFilmstrip currentIndex={currentIndex} onSelect={onSelect} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500 z-20">
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

function MobilePhotoSlide({
  photo,
  index,
  progress,
}: {
  photo: Photo;
  index: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [index - 1, index, index + 1], ["100%", "0%", "-100%"]);
  const opacity = useTransform(progress, [index - 0.8, index - 0.3, index, index + 0.3, index + 0.8], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y, opacity }}
    >
      <Image
        src={photo.src}
        alt={photo.location}
        fill
        className="object-contain"
        sizes="95vw"
        priority={index < 3}
      />
    </motion.div>
  );
}
