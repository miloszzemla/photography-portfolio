"use client";

import { usePhotoNavigation } from "@/hooks/usePhotoNavigation";
import { Filmstrip } from "./Filmstrip";
import { MainPhoto } from "./MainPhoto";
import { MetadataPanel } from "./MetadataPanel";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";
import { ViewfinderCursor } from "./ViewfinderCursor";
import { MobileView } from "./MobileView";

export function PhotoViewer() {
  const { currentIndex, currentPhoto, total, progress, goTo } = usePhotoNavigation();

  return (
    <>
      {/* Desktop — fullscreen viewer */}
      <div className="relative h-screen w-screen overflow-hidden bg-white hidden md:block">
        <ViewfinderCursor />
        <TopBar
          currentIndex={currentIndex}
          total={total}
          timecode={currentPhoto.timecode}
          location={currentPhoto.location}
        />
        <MainPhoto progress={progress} currentIndex={currentIndex} />
        <div className="absolute top-0 left-0 h-full z-20">
          <Filmstrip currentIndex={currentIndex} onSelect={goTo} />
        </div>
        <div className="absolute top-0 right-0 h-full z-20">
          <MetadataPanel photo={currentPhoto} index={currentIndex} total={total} />
        </div>
        <BottomBar currentIndex={currentIndex} onSelect={goTo} />
      </div>

      {/* Mobile — static layout */}
      <div className="md:hidden">
        <MobileView
          currentIndex={currentIndex}
          currentPhoto={currentPhoto}
          total={total}
          onSelect={goTo}
        />
      </div>
    </>
  );
}
