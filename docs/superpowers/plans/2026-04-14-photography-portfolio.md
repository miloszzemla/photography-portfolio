# Photography Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować pełnoekranowy przeglądnik zdjęć fotograficznych w stylu kinowego HUD-a, inspirowany adambricker.com/photography.

**Architecture:** Single-page Next.js app. Jeden główny komponent `PhotoViewer` zarządza stanem (aktywne zdjęcie), renderuje 5 podkomponentów: `Filmstrip`, `MainPhoto`, `MetadataPanel`, `TopBar`, `BottomBar`. Custom cursor jako osobny komponent. Scroll/keyboard nawigacja w hooku `usePhotoNavigation`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Tailwind CSS v4

---

## File Structure

```
src/
  app/
    layout.tsx          — root layout, fonty (Inter + JetBrains Mono), global styles
    page.tsx            — importuje PhotoViewer
    globals.css         — Tailwind directives, cursor:none, base styles
  components/
    PhotoViewer.tsx     — główny kontener, state management, layout grid
    Filmstrip.tsx       — lewy pasek miniatur
    MainPhoto.tsx       — centralne zdjęcie z dekoracjami kadru
    MetadataPanel.tsx   — prawa kolumna z danymi zdjęcia
    TopBar.tsx          — górny pasek HUD
    BottomBar.tsx       — dolny pasek HUD
    ViewfinderCursor.tsx — custom cursor
  hooks/
    usePhotoNavigation.ts — scroll/keyboard navigation logic
    useClock.ts           — live clock hook
  data/
    photos.ts           — mock data (Photo interface + tablica)
```

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create Next.js app**

```bash
cd /Users/miloszzemla/Desktop/photography-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. This creates the full scaffold.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/miloszzemla/Desktop/photography-portfolio
npm install framer-motion
```

- [ ] **Step 3: Add fonts to layout.tsx**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Photography Portfolio",
  description: "Photography portfolio in cinematic HUD style",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Set up globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}

* {
  cursor: none !important;
}

body {
  overflow: hidden;
  background: #ffffff;
  color: #1a1a1a;
}

::selection {
  background: #1a1a1a;
  color: #ffffff;
}
```

- [ ] **Step 5: Minimal page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center font-mono text-sm">
      Photography Portfolio — loading...
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
cd /Users/miloszzemla/Desktop/photography-portfolio
PORT=3004 npm run dev
```

Expected: App loads at http://localhost:3004, shows "Photography Portfolio — loading...", cursor is hidden.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with fonts and base styles"
```

---

### Task 2: Photo data and types

**Files:**
- Create: `src/data/photos.ts`

- [ ] **Step 1: Create photo data file**

Create `src/data/photos.ts`:

```ts
export interface Photo {
  id: number;
  src: string;
  thumbnail: string;
  location: string;
  camera: string;
  lens: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  timecode: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=150&h=200&fit=crop&q=60",
    location: "Bali, Indonesia",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "8.3405° S", lng: "115.0920° E" },
    timecode: "08:14:22",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=200&fit=crop&q=60",
    location: "Paris, France",
    camera: "Sony A7IV",
    lens: "Zeiss 35mm f/1.4",
    coordinates: { lat: "48.8566° N", lng: "2.3522° E" },
    timecode: "14:32:07",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=150&h=200&fit=crop&q=60",
    location: "Rome, Italy",
    camera: "Hasselblad X2D",
    lens: "XCD 45mm f/3.5",
    coordinates: { lat: "41.9028° N", lng: "12.4964° E" },
    timecode: "11:05:48",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=150&h=200&fit=crop&q=60",
    location: "Kyoto, Japan",
    camera: "Fujifilm GFX 100S",
    lens: "GF 80mm f/1.7",
    coordinates: { lat: "35.0116° N", lng: "135.7681° E" },
    timecode: "06:48:33",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=150&h=200&fit=crop&q=60",
    location: "Reykjavik, Iceland",
    camera: "Leica M11",
    lens: "Summicron 50mm f/2",
    coordinates: { lat: "64.1466° N", lng: "21.9426° W" },
    timecode: "22:15:01",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=150&h=200&fit=crop&q=60",
    location: "Amalfi, Italy",
    camera: "Canon R5",
    lens: "RF 24-70mm f/2.8",
    coordinates: { lat: "40.6340° N", lng: "14.6027° E" },
    timecode: "16:22:55",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=200&fit=crop&q=60",
    location: "Maldives",
    camera: "Nikon Z9",
    lens: "Nikkor 14-24mm f/2.8",
    coordinates: { lat: "3.2028° N", lng: "73.2207° E" },
    timecode: "10:44:19",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=150&h=200&fit=crop&q=60",
    location: "Santorini, Greece",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "36.3932° N", lng: "25.4615° E" },
    timecode: "18:07:42",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=200&fit=crop&q=60",
    location: "Swiss Alps",
    camera: "Sony A1",
    lens: "GM 24mm f/1.4",
    coordinates: { lat: "46.8182° N", lng: "8.2275° E" },
    timecode: "05:33:28",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=150&h=200&fit=crop&q=60",
    location: "Florence, Italy",
    camera: "Hasselblad 907X",
    lens: "XCD 38mm f/2.5",
    coordinates: { lat: "43.7696° N", lng: "11.2558° E" },
    timecode: "13:19:56",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&h=200&fit=crop&q=60",
    location: "Lake Como, Italy",
    camera: "Leica SL2",
    lens: "Vario-Elmarit 24-90mm",
    coordinates: { lat: "45.9937° N", lng: "9.2572° E" },
    timecode: "09:51:14",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=150&h=200&fit=crop&q=60",
    location: "Sydney, Australia",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7",
    coordinates: { lat: "33.8688° S", lng: "151.2093° E" },
    timecode: "07:28:41",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=150&h=200&fit=crop&q=60",
    location: "Big Sur, California",
    camera: "Canon R5",
    lens: "RF 15-35mm f/2.8",
    coordinates: { lat: "36.2704° N", lng: "121.8081° W" },
    timecode: "17:06:33",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=150&h=200&fit=crop&q=60",
    location: "San Francisco, USA",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/1.4",
    coordinates: { lat: "37.7749° N", lng: "122.4194° W" },
    timecode: "19:42:08",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=150&h=200&fit=crop&q=60",
    location: "Marrakech, Morocco",
    camera: "Leica M11",
    lens: "Elmarit 28mm f/2.8",
    coordinates: { lat: "31.6295° N", lng: "7.9811° W" },
    timecode: "12:55:47",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=150&h=200&fit=crop&q=60",
    location: "Fiji Islands",
    camera: "Sony A7RV",
    lens: "GM 35mm f/1.4",
    coordinates: { lat: "17.7134° S", lng: "178.0650° E" },
    timecode: "15:38:22",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/photos.ts
git commit -m "feat: add photo data types and mock data"
```

---

### Task 3: Navigation hooks

**Files:**
- Create: `src/hooks/usePhotoNavigation.ts`, `src/hooks/useClock.ts`

- [ ] **Step 1: Create usePhotoNavigation hook**

Create `src/hooks/usePhotoNavigation.ts`:

```ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { photos } from "@/data/photos";

export function usePhotoNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      const clamped = Math.max(0, Math.min(photos.length - 1, index));
      if (clamped === currentIndex) return;

      setIsAnimating(true);
      setCurrentIndex(clamped);

      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      animationTimeout.current = setTimeout(() => setIsAnimating(false), 600);
    },
    [currentIndex, isAnimating]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [goNext, goPrev]);

  return {
    currentIndex,
    currentPhoto: photos[currentIndex],
    total: photos.length,
    goTo,
    goNext,
    goPrev,
    isAnimating,
  };
}
```

- [ ] **Step 2: Create useClock hook**

Create `src/hooks/useClock.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop()?.replace("_", " ") ?? "";
      setTime(`${h}:${m} ${tz}`);
    };
    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add photo navigation and clock hooks"
```

---

### Task 4: ViewfinderCursor component

**Files:**
- Create: `src/components/ViewfinderCursor.tsx`

- [ ] **Step 1: Create ViewfinderCursor**

Create `src/components/ViewfinderCursor.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function ViewfinderCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerp = 0.15;
      position.current.x += (target.current.x - position.current.x) * lerp;
      position.current.y += (target.current.y - position.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x - 25}px, ${position.current.y - 25}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ width: 50, height: 50 }}
    >
      {/* Outer frame corners */}
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left corner */}
        <path d="M1 12V1H12" stroke="#1a1a1a" strokeWidth="1" />
        {/* Top-right corner */}
        <path d="M38 1H49V12" stroke="#1a1a1a" strokeWidth="1" />
        {/* Bottom-left corner */}
        <path d="M1 38V49H12" stroke="#1a1a1a" strokeWidth="1" />
        {/* Bottom-right corner */}
        <path d="M38 49H49V38" stroke="#1a1a1a" strokeWidth="1" />
        {/* Crosshair */}
        <line x1="25" y1="19" x2="25" y2="31" stroke="#1a1a1a" strokeWidth="0.75" />
        <line x1="19" y1="25" x2="31" y2="25" stroke="#1a1a1a" strokeWidth="0.75" />
      </svg>
      {/* White outline for visibility on dark images */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-50"
      >
        <path d="M1 12V1H12" stroke="#ffffff" strokeWidth="2" />
        <path d="M38 1H49V12" stroke="#ffffff" strokeWidth="2" />
        <path d="M1 38V49H12" stroke="#ffffff" strokeWidth="2" />
        <path d="M38 49H49V38" stroke="#ffffff" strokeWidth="2" />
        <line x1="25" y1="19" x2="25" y2="31" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="19" y1="25" x2="31" y2="25" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ViewfinderCursor.tsx
git commit -m "feat: add viewfinder custom cursor component"
```

---

### Task 5: TopBar and BottomBar components

**Files:**
- Create: `src/components/TopBar.tsx`, `src/components/BottomBar.tsx`

- [ ] **Step 1: Create TopBar**

Create `src/components/TopBar.tsx`:

```tsx
"use client";

import { useClock } from "@/hooks/useClock";

interface TopBarProps {
  currentIndex: number;
  total: number;
  timecode: string;
}

export function TopBar({ currentIndex, total, timecode }: TopBarProps) {
  const clock = useClock();

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
      <div className="flex items-center gap-4">
        <button className="text-neutral-800 hover:text-black transition-colors">
          &larr;
        </button>
        <span>{clock}</span>
        <span className="text-neutral-400">Los Angeles</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-neutral-300">+</span>
        <span className="text-neutral-800 font-medium normal-case tracking-normal text-xs">
          View Work
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
  );
}
```

- [ ] **Step 2: Create BottomBar**

Create `src/components/BottomBar.tsx`:

```tsx
export function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
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
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TopBar.tsx src/components/BottomBar.tsx
git commit -m "feat: add TopBar and BottomBar HUD components"
```

---

### Task 6: Filmstrip component

**Files:**
- Create: `src/components/Filmstrip.tsx`

- [ ] **Step 1: Create Filmstrip**

Create `src/components/Filmstrip.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { photos } from "@/data/photos";
import Image from "next/image";

interface FilmstripProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

const THUMB_HEIGHT = 72;
const THUMB_GAP = 4;

export function Filmstrip({ currentIndex, onSelect }: FilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scrollTop = currentIndex * (THUMB_HEIGHT + THUMB_GAP) - containerRef.current.clientHeight / 2 + THUMB_HEIGHT / 2;
    containerRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div className="relative z-20 flex flex-col h-full w-[72px] py-16">
      <div
        ref={containerRef}
        className="flex flex-col gap-1 overflow-hidden flex-1 px-2"
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => onSelect(index)}
            className="relative shrink-0 w-full overflow-hidden"
            style={{ height: THUMB_HEIGHT }}
          >
            <Image
              src={photo.thumbnail}
              alt={photo.location}
              fill
              className="object-cover"
              sizes="64px"
            />
            {index === currentIndex && (
              <motion.div
                layoutId="filmstrip-selector"
                className="absolute inset-0 border-2 border-white ring-1 ring-neutral-300"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {index !== currentIndex && (
              <div className="absolute inset-0 bg-black/30" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Filmstrip.tsx
git commit -m "feat: add Filmstrip thumbnail navigation component"
```

---

### Task 7: MainPhoto component

**Files:**
- Create: `src/components/MainPhoto.tsx`

- [ ] **Step 1: Create MainPhoto**

Create `src/components/MainPhoto.tsx`:

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photos";
import Image from "next/image";

interface MainPhotoProps {
  photo: Photo;
  index: number;
}

export function MainPhoto({ photo, index }: MainPhotoProps) {
  return (
    <div className="relative flex-1 h-full flex items-center justify-center px-8 py-16">
      {/* Corner brackets - viewfinder frame */}
      <div className="absolute top-20 left-24 text-neutral-300 text-lg font-mono leading-none select-none">
        <div className="w-5 h-5 border-l border-t border-neutral-300" />
      </div>
      <div className="absolute top-20 right-[280px] text-neutral-300 text-lg font-mono leading-none select-none">
        <div className="w-5 h-5 border-r border-t border-neutral-300" />
      </div>
      <div className="absolute bottom-20 left-24 text-neutral-300 text-lg font-mono leading-none select-none">
        <div className="w-5 h-5 border-l border-b border-neutral-300" />
      </div>
      <div className="absolute bottom-20 right-[280px] text-neutral-300 text-lg font-mono leading-none select-none">
        <div className="w-5 h-5 border-r border-b border-neutral-300" />
      </div>

      {/* Crosshair marks */}
      <span className="absolute top-20 left-1/3 text-neutral-300 font-mono text-xs select-none">+</span>
      <span className="absolute bottom-20 right-1/3 text-neutral-300 font-mono text-xs select-none">+</span>

      {/* Main image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full h-full max-w-[900px] max-h-[80vh]"
        >
          <Image
            src={photo.src}
            alt={photo.location}
            fill
            className="object-contain"
            sizes="(max-width: 1400px) 60vw, 900px"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MainPhoto.tsx
git commit -m "feat: add MainPhoto component with crossfade animation"
```

---

### Task 8: MetadataPanel component

**Files:**
- Create: `src/components/MetadataPanel.tsx`

- [ ] **Step 1: Create MetadataPanel**

Create `src/components/MetadataPanel.tsx`:

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photos";

interface MetadataPanelProps {
  photo: Photo;
  index: number;
  total: number;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export function MetadataPanel({ photo, index, total }: MetadataPanelProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="relative z-20 w-[220px] h-full flex flex-col justify-between py-16 pr-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={stagger}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-1"
        >
          {/* Big number + counter */}
          <motion.div variants={fadeUp} className="flex items-start justify-between">
            <span className="font-mono text-[80px] leading-none font-extralight text-neutral-800">
              {paddedIndex}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-4">
            {/* Camera */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                Camera
              </span>
              <span className="font-mono text-xs text-neutral-700 mt-0.5 block">
                {photo.camera}
              </span>
            </div>

            {/* Lens */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                Lens
              </span>
              <span className="font-mono text-xs text-neutral-700 mt-0.5 block">
                {photo.lens}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom section - coordinates + location */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-[10px] text-neutral-400">
            {photo.coordinates.lat}, {photo.coordinates.lng}
          </span>
          <span className="font-sans text-sm font-semibold text-neutral-800">
            {photo.location}
          </span>
          <span className="font-mono text-[10px] text-neutral-400">
            ({index + 1}/{total})
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MetadataPanel.tsx
git commit -m "feat: add MetadataPanel with staggered fade animations"
```

---

### Task 9: PhotoViewer — assemble everything

**Files:**
- Create: `src/components/PhotoViewer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create PhotoViewer**

Create `src/components/PhotoViewer.tsx`:

```tsx
"use client";

import { usePhotoNavigation } from "@/hooks/usePhotoNavigation";
import { Filmstrip } from "./Filmstrip";
import { MainPhoto } from "./MainPhoto";
import { MetadataPanel } from "./MetadataPanel";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";
import { ViewfinderCursor } from "./ViewfinderCursor";

export function PhotoViewer() {
  const { currentIndex, currentPhoto, total, goTo } = usePhotoNavigation();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      <ViewfinderCursor />
      <TopBar
        currentIndex={currentIndex}
        total={total}
        timecode={currentPhoto.timecode}
      />

      <div className="flex h-full">
        <Filmstrip currentIndex={currentIndex} onSelect={goTo} />
        <MainPhoto photo={currentPhoto} index={currentIndex} />
        <MetadataPanel photo={currentPhoto} index={currentIndex} total={total} />
      </div>

      <BottomBar />
    </div>
  );
}
```

- [ ] **Step 2: Update page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import { PhotoViewer } from "@/components/PhotoViewer";

export default function Home() {
  return <PhotoViewer />;
}
```

- [ ] **Step 3: Add Unsplash domains to next.config**

Update `next.config.ts` to allow Unsplash images:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verify in browser**

Open http://localhost:3004 — should see the full photo viewer with filmstrip, main photo, metadata, HUD bars, and custom cursor. Scroll to navigate between photos.

- [ ] **Step 5: Commit**

```bash
git add src/components/PhotoViewer.tsx src/app/page.tsx next.config.ts
git commit -m "feat: assemble PhotoViewer with all components"
```

---

### Task 10: Polish and visual refinements

**Files:**
- Modify: various components for final tuning

- [ ] **Step 1: Test all interactions**

Verify in browser at http://localhost:3004:
- Scroll navigation works (one photo per scroll step)
- Keyboard navigation works (arrow keys)
- Filmstrip click navigation works
- Custom cursor follows mouse with smooth lag
- Animations are smooth (crossfade on photo, stagger on metadata)
- Top/bottom bars show correct data
- Counter updates correctly

- [ ] **Step 2: Fix any visual issues**

Iterate on spacing, sizing, colors to match the reference as closely as possible.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: polish visual details and finalize photography portfolio"
```
