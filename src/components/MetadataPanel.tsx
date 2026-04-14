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
  transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] as const },
};

export function MetadataPanel({ photo, index, total }: MetadataPanelProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="relative z-20 w-[220px] h-full hidden md:flex flex-col justify-between py-16 pr-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={stagger}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-1"
        >
          {/* Big number */}
          <motion.div variants={fadeUp} className="flex items-start justify-end">
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
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
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
