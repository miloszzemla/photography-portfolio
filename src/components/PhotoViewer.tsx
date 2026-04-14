"use client";

import { usePhotoNavigation } from "@/hooks/usePhotoNavigation";
import { Filmstrip } from "./Filmstrip";
import { MainPhoto } from "./MainPhoto";
import { MetadataPanel } from "./MetadataPanel";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";
import { ViewfinderCursor } from "./ViewfinderCursor";

export function PhotoViewer() {
  const { currentIndex, currentPhoto, total, progress, goTo } = usePhotoNavigation();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      <ViewfinderCursor />
      <TopBar
        currentIndex={currentIndex}
        total={total}
        timecode={currentPhoto.timecode}
        location={currentPhoto.location}
      />

      {/* Main photo — centered on full viewport */}
      <MainPhoto progress={progress} currentIndex={currentIndex} />

      {/* Filmstrip — overlaid on left */}
      <div className="absolute top-0 left-0 h-full z-20">
        <Filmstrip currentIndex={currentIndex} onSelect={goTo} />
      </div>

      {/* Metadata — overlaid on right */}
      <div className="absolute top-0 right-0 h-full z-20">
        <MetadataPanel photo={currentPhoto} index={currentIndex} total={total} />
      </div>

      <BottomBar currentIndex={currentIndex} onSelect={goTo} />
    </div>
  );
}
