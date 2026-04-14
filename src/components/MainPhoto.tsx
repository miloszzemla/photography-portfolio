"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { photos } from "@/data/photos";
import Image from "next/image";

interface MainPhotoProps {
  progress: MotionValue<number>;
  currentIndex: number;
}

export function MainPhoto({ progress, currentIndex }: MainPhotoProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 py-14 md:py-16 overflow-hidden z-10">
      {/* Viewfinder brackets (mobile) */}
      <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative" style={{ width: 40, height: 28 }}>
          <div className="absolute left-0 top-0 w-2 h-full border-l border-t border-b border-neutral-400" />
          <div className="absolute right-0 top-0 w-2 h-full border-r border-t border-b border-neutral-400" />
        </div>
      </div>

      {/* Photo stack — continuous filmstrip */}
      <div className="relative w-full h-full max-w-[65vw] max-h-[75vh] md:max-w-[50vw]">
        {photos.map((photo, i) => (
          <PhotoSlide key={photo.id} photo={photo} index={i} progress={progress} />
        ))}

        {/* Corner brackets (desktop) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
          <div className="absolute -top-3 -left-3 w-4 h-4 border-l border-t border-neutral-400" />
          <div className="absolute -top-3 -right-3 w-4 h-4 border-r border-t border-neutral-400" />
          <div className="absolute -bottom-3 -left-3 w-4 h-4 border-l border-b border-neutral-400" />
          <div className="absolute -bottom-3 -right-3 w-4 h-4 border-r border-b border-neutral-400" />
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-neutral-300 font-mono text-[10px] select-none">
            +
          </span>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-neutral-300 font-mono text-[10px] select-none">
            +
          </span>
        </div>
      </div>
    </div>
  );
}

function PhotoSlide({
  photo,
  index,
  progress,
}: {
  photo: (typeof photos)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Each photo: at its index it's at y=0, before it's pushed up 100%, after it's pushed down 100%
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
        sizes="(max-width: 768px) 90vw, 50vw"
        priority={index < 3}
      />
    </motion.div>
  );
}
