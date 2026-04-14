"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useMotionValue, animate } from "framer-motion";
import { photos } from "@/data/photos";

export function usePhotoNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useMotionValue(0);
  const target = useRef(0);
  const snapTimer = useRef<NodeJS.Timeout>(undefined);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(photos.length - 1, index));
    target.current = clamped;
    animate(progress, clamped, { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] });
    setCurrentIndex(clamped);
  }, [progress]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      const rounded = Math.round(v);
      const clamped = Math.max(0, Math.min(photos.length - 1, rounded));
      setCurrentIndex(clamped);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const scheduleSnap = () => {
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        const snapped = Math.round(target.current);
        const clamped = Math.max(0, Math.min(photos.length - 1, snapped));
        target.current = clamped;
        animate(progress, clamped, { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] });
      }, 120);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.0015;
      target.current += e.deltaY * sensitivity;
      target.current = Math.max(0, Math.min(photos.length - 1, target.current));

      // Direct set — no spring lag
      progress.set(target.current);
      scheduleSnap();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goTo(Math.round(target.current) + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goTo(Math.round(target.current) - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(snapTimer.current);
    };
  }, [progress, goTo]);

  return {
    currentIndex,
    currentPhoto: photos[currentIndex],
    total: photos.length,
    progress,
    goTo,
  };
}
