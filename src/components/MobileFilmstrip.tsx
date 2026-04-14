"use client";

import { useRef, useEffect } from "react";
import { photos } from "@/data/photos";
import Image from "next/image";

interface MobileFilmstripProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

const THUMB_WIDTH = 64;
const THUMB_HEIGHT = 80;
const THUMB_GAP = 6;

export function MobileFilmstrip({ currentIndex, onSelect }: MobileFilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scrollLeft =
      currentIndex * (THUMB_WIDTH + THUMB_GAP) -
      containerRef.current.clientWidth / 2 +
      THUMB_WIDTH / 2;
    containerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="flex md:hidden gap-1.5 overflow-x-auto flex-1 px-2"
      style={{ scrollbarWidth: "none" }}
    >
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onSelect(index)}
          className="relative shrink-0 overflow-hidden"
          style={{ width: THUMB_WIDTH, height: THUMB_HEIGHT }}
        >
          <Image
            src={photo.thumbnail}
            alt={photo.location}
            fill
            className="object-cover"
            sizes="64px"
          />
          {index !== currentIndex && (
            <div className="absolute inset-0 bg-black/25" />
          )}
          {index === currentIndex && (
            <div className="absolute inset-0 ring-1 ring-neutral-800" />
          )}
        </button>
      ))}
    </div>
  );
}
