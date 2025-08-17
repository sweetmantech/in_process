"use client";

import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Feed from "@/components/HorizontalFeed/Feed";
import Slider from "@/components/Slider";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import Controls from "@/components/HorizontalFeed/Controls";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";
import { useState, useEffect } from "react";
import { fullscreenManager } from "@/lib/fullscreenManager";

const HorizontalTimeline = () => {
  const { moments } = useTimelineApiContext();
  const tokens = mapMomentsToTokens(moments);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const {
    getHeight,
    isHovered,
    handleMouseMove,
    setActiveIndex,
    setFeedEnded,
    setSwiper,
    containerRef,
    timelineRef,
  } = useHorizontalFeedAnimationProvider();

  useEffect(() => {
    // Listen for fullscreen changes to disable mouse interactions
    const unsubscribe = fullscreenManager.addListener((fullscreen) => {
      setIsFullscreen(fullscreen);
    });

    // Set initial state
    setIsFullscreen(fullscreenManager.getIsFullscreen());

    return unsubscribe;
  }, []);

  // Create a fullscreen-aware mouse move handler
  const handleMouseMoveWithFullscreenCheck = (e: React.MouseEvent) => {
    if (isFullscreen) {
      return; // Completely ignore mouse events when fullscreen
    }
    handleMouseMove(e);
  };

  const handleMouseLeaveWithFullscreenCheck = () => {
    if (isFullscreen) {
      return; // Completely ignore mouse events when fullscreen
    }
    handleMouseMove({ clientX: null } as any);
  };

  return (
    <div
      className="relative grow size-full flex justify-center items-end overflow-visible"
      onMouseMove={handleMouseMoveWithFullscreenCheck}
      onMouseLeave={handleMouseLeaveWithFullscreenCheck}
      ref={containerRef}
      style={{
        pointerEvents: isFullscreen ? 'none' : 'auto',
      }}
    >
      <div className="pointer-events-none size-full absolute flex items-end left-0 top-0">
        <div className="bg-black w-full h-[0.5px]" />
      </div>
      <div
        className="relative w-full"
        ref={timelineRef}
        style={{
          maxWidth: containerRef.current?.offsetWidth,
        }}
      >
        <Controls />
        <Slider
          sliderProps={{
            slidesPerView: "auto",
            grabCursor: true,
            initialSlide: Math.max(0, tokens.length - 1),
            mousewheel: {
              sensitivity: 1,
            },
            onSwiper(swiper) {
              setSwiper(swiper);
            },
            onSlideChange(swiper) {
              setActiveIndex(swiper.activeIndex + 1);
            },
            onProgress(_, progress) {
              setFeedEnded(progress === 1);
            },
          }}
          className="w-full !overflow-visible !h-0"
          slideClassName="!w-fit !m-0"
        >
          {tokens.map((token, i) => (
            <Feed
              key={i}
              feed={token}
              hovered={isHovered(i)}
              step={1}
              height={getHeight(i)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HorizontalTimeline;
