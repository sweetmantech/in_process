"use client";

import { FC } from "react";
import Feed from "./Feed";
import Slider from "../Slider";
import { Token } from "@/types/token";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import Controls from "./Controls";
import FetchMoreInspector from "../FetchMoreInspector";

interface HorizontalFeedProps {
  feeds: Token[];
  fetchMore?: () => void;
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({
  feeds,
  fetchMore = () => {},
}) => {
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

  return (
    <div
      className="relative grow size-full flex justify-center items-end overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleMouseMove({ clientX: null } as any)}
      ref={containerRef}
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
            initialSlide: Math.max(0, feeds.length - 1),
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
          {Array.from({ length: feeds.length + 1 }).map((_, i) => (
            <>
              {i < feeds.length ? (
                <Feed
                  key={i}
                  feed={feeds[i]}
                  hovered={isHovered(i)}
                  step={1}
                  height={getHeight(i)}
                />
              ) : (
                <FetchMoreInspector fetchMore={fetchMore} />
              )}
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HorizontalFeed;
