"use client";

import { MobileFilmstrip } from "./MobileFilmstrip";

interface BottomBarProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function BottomBar({ currentIndex, onSelect }: BottomBarProps) {
  return (
    <>
      {/* Desktop bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden md:flex items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
        <div className="flex items-center gap-4">
          <span className="text-neutral-800">M. Z.</span>
          <span>Photographer</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-neutral-300">+</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-800 transition-colors"
          >
            Instagram
          </a>
        </div>

        <span>&copy;2026</span>
      </div>

      {/* Mobile bottom bar — filmstrip + links */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex md:hidden flex-col gap-2 pb-3 bg-gradient-to-t from-white via-white/95 to-transparent pt-4">
        <MobileFilmstrip currentIndex={currentIndex} onSelect={onSelect} />
        <div className="flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          <span>&copy;2026</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">LA.,NJ.,CH..</span>
            <span>Cinematographer</span>
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
    </>
  );
}
