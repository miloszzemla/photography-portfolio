"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useMotionValue, useTransform, motion, animate, type MotionValue } from "framer-motion";
import type { Photo } from "@/data/photos";
import { photos } from "@/data/photos";
import { MobileFilmstrip } from "./MobileFilmstrip";
import Image from "next/image";

export function MobileView({
  currentIndex: externalIndex,
  currentPhoto: _,
  total,
  onSelect,
}: {
  currentIndex: number;
  currentPhoto: Photo;
  total: number;
  onSelect: (index: number) => void;
}) {
  const progress = useMotionValue(externalIndex);
  const [displayIndex, setDisplayIndex] = useState(externalIndex);
  const touchStartY = useRef(0);
  const touchStartProgress = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const velocity = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouching = useRef(false);

  const lastSnapped = useRef(externalIndex);

  // Track display index from progress (lightweight — only rounds)
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      const rounded = Math.round(v);
      const clamped = Math.max(0, Math.min(photos.length - 1, rounded));
      setDisplayIndex(clamped);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isTouching.current = true;
      progress.stop();
      touchStartY.current = e.touches[0].clientY;
      touchStartProgress.current = progress.get();
      lastTouchY.current = e.touches[0].clientY;
      lastTouchTime.current = Date.now();
      velocity.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const now = Date.now();

      const dt = now - lastTouchTime.current;
      if (dt > 0) {
        velocity.current = (lastTouchY.current - currentY) / dt;
      }
      lastTouchY.current = currentY;
      lastTouchTime.current = now;

      const deltaY = touchStartY.current - currentY;
      const screenH = window.innerHeight;
      const progressDelta = (deltaY / screenH) * 1.8;
      const newProgress = Math.max(0, Math.min(photos.length - 1, touchStartProgress.current + progressDelta));
      progress.set(newProgress);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      isTouching.current = false;

      const momentumDistance = velocity.current * 0.2;
      const projected = progress.get() + momentumDistance;
      const snapped = Math.round(projected);
      const clamped = Math.max(0, Math.min(photos.length - 1, snapped));

      lastSnapped.current = clamped;
      animate(progress, clamped, {
        type: "spring",
        stiffness: 250,
        damping: 25,
        velocity: velocity.current * 0.4,
      });
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [progress]);

  const displayPhoto = photos[displayIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col bg-white"
      style={{ touchAction: "none" }}
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
            {displayPhoto.location}
          </span>
        </div>
        <span className="font-mono text-[11px] text-neutral-500 mt-2">
          ({displayIndex + 1}/{total})
        </span>
      </div>

      {/* Main photo — continuous filmstrip */}
      <div className="flex-1 relative overflow-hidden mx-4">
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
        <MobileFilmstrip currentIndex={displayIndex} onSelect={(i) => {
          lastSnapped.current = i;
          animate(progress, i, { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] });
        }} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500 z-20">
        <span>&copy;2026</span>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">M.Z.</span>
          <span>Photographer</span>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600">
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
  const opacity = useTransform(progress, [index - 0.6, index, index + 0.6], [0, 1, 0]);

  return (
    <motion.div className="absolute inset-0" style={{ y, opacity }}>
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
