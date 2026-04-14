"use client";

import { useClock } from "@/hooks/useClock";

interface TopBarProps {
  currentIndex: number;
  total: number;
  timecode: string;
  location: string;
}

export function TopBar({ currentIndex, total, timecode, location }: TopBarProps) {
  const clock = useClock();

  return (
    <>
      {/* Desktop top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 hidden md:flex items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
        <div className="flex items-center gap-4">
          <button className="text-neutral-800 hover:text-black transition-colors text-sm">
            &larr;
          </button>
          <span>{clock}</span>
          <span className="text-neutral-400">Warsaw</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-300">+</span>
          <span className="text-neutral-800 normal-case tracking-[0.2em] text-[13px] font-light">
            Milosz Zemla
          </span>
          <span className="text-neutral-300">+</span>
        </div>

        <div className="flex items-center gap-4">
          <span>{timecode}</span>
          <span className="text-neutral-300">+</span>
          <span className="text-neutral-800">
            ({currentIndex + 1}/{total})
          </span>
        </div>
      </div>

      {/* Mobile top bar — location + counter */}
      <div className="absolute top-0 left-0 right-0 z-30 flex md:hidden items-start justify-between px-4 py-3">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Location:
          </span>
          <span className="font-sans text-sm font-semibold text-neutral-800">
            {location}
          </span>
        </div>
        <span className="font-mono text-[11px] text-neutral-500 mt-1">
          ({currentIndex + 1}/{total})
        </span>
      </div>
    </>
  );
}
