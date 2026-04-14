"use client";

import { useEffect, useRef } from "react";

const W = 44;
const H = 30;

export function ViewfinderCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerp = 0.15;
      position.current.x += (target.current.x - position.current.x) * lerp;
      position.current.y += (target.current.y - position.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x - W / 2}px, ${position.current.y - H / 2}px)`;
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

  const c = 10; // corner length

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
      style={{ width: W, height: H }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-left corner */}
        <path d={`M0.5 ${c}V0.5H${c}`} stroke="white" strokeWidth="1" />
        {/* Top-right corner */}
        <path d={`M${W - c} 0.5H${W - 0.5}V${c}`} stroke="white" strokeWidth="1" />
        {/* Bottom-left corner */}
        <path d={`M0.5 ${H - c}V${H - 0.5}H${c}`} stroke="white" strokeWidth="1" />
        {/* Bottom-right corner */}
        <path d={`M${W - c} ${H - 0.5}H${W - 0.5}V${H - c}`} stroke="white" strokeWidth="1" />
        {/* Crosshair */}
        <line x1={W / 2} y1={H / 2 - 4} x2={W / 2} y2={H / 2 + 4} stroke="white" strokeWidth="0.75" />
        <line x1={W / 2 - 4} y1={H / 2} x2={W / 2 + 4} y2={H / 2} stroke="white" strokeWidth="0.75" />
      </svg>
    </div>
  );
}
