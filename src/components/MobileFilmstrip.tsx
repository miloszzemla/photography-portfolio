"use client";

import { useRef, useEffect } from "react";
import { photos } from "@/data/photos";
import Image from "next/image";

interface MobileFilmstripProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

const SIZES = [
  { w: 72, h: 90 },
  { w: 56, h: 70 },
  { w: 80, h: 64 },
  { w: 60, h: 80 },
  { w: 68, h: 54 },
];

export function MobileFilmstrip({ currentIndex, onSelect }: MobileFilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (!children[currentIndex]) return;
    const child = children[currentIndex] as HTMLElement;
    const scrollLeft = child.offsetLeft - containerRef.current.clientWidth / 2 + child.clientWidth / 2;
    containerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [currentIndex]);

  // Stop touch events from bubbling to parent (which handles vertical swipe)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stop = (e: TouchEvent) => e.stopPropagation();
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    el.addEventListener("touchend", stop, { passive: true });

    return () => {
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchmove", stop);
      el.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex md:hidden gap-1.5 overflow-x-auto items-end px-3 pb-1"
      style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
    >
      {photos.map((photo, index) => {
        const size = SIZES[index % SIZES.length];
        return (
          <button
            key={photo.id}
            onClick={() => onSelect(index)}
            className="relative shrink-0 overflow-hidden"
            style={{ width: size.w, height: size.h }}
          >
            <Image
              src={photo.thumbnail}
              alt={photo.location}
              fill
              className="object-cover"
              sizes={`${size.w}px`}
            />
            {index !== currentIndex && (
              <div className="absolute inset-0 bg-black/20" />
            )}
            {index === currentIndex && (
              <div className="absolute inset-0 ring-1 ring-neutral-800" />
            )}
          </button>
        );
      })}
    </div>
  );
}
