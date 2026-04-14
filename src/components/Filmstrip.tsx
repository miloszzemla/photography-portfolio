"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { photos } from "@/data/photos";
import Image from "next/image";

interface FilmstripProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

const THUMB_HEIGHT = 80;
const THUMB_WIDTH = 64;
const THUMB_GAP = 6;
const FRAME_PAD = 6;

export function Filmstrip({ currentIndex, onSelect }: FilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameTop, setFrameTop] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const scrollTop =
      currentIndex * (THUMB_HEIGHT + THUMB_GAP) -
      containerRef.current.clientHeight / 2 +
      THUMB_HEIGHT / 2;
    containerRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const itemTop = currentIndex * (THUMB_HEIGHT + THUMB_GAP);
      const scrolled = containerRef.current.scrollTop;
      setFrameTop(itemTop - scrolled);
    };

    update();
    const el = containerRef.current;
    el?.addEventListener("scroll", update);
    return () => el?.removeEventListener("scroll", update);
  }, [currentIndex]);

  return (
    <div className="relative z-20 hidden md:flex flex-col h-full w-[120px] py-14">
      {/* Outer wrapper — no overflow hidden, so frame can extend */}
      <div className="relative flex-1">
        {/* Scrollable thumbnails — clipped to its own area */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex flex-col gap-1.5 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            paddingLeft: FRAME_PAD + 8,
            paddingRight: FRAME_PAD + 16,
          }}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => onSelect(index)}
              className="relative shrink-0 overflow-hidden"
              style={{ height: THUMB_HEIGHT, width: THUMB_WIDTH }}
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
            </button>
          ))}
        </div>

        {/* Selection frame — sits in the non-clipped parent */}
        <motion.div
          className="absolute pointer-events-none z-10"
          style={{
            left: 8,
            width: THUMB_WIDTH + FRAME_PAD * 2,
            height: THUMB_HEIGHT + FRAME_PAD * 2,
            border: "1px solid #333",
          }}
          animate={{ top: frameTop - FRAME_PAD }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
