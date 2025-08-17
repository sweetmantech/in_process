"use client";

import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Feed from "@/components/HorizontalFeed/Feed";
import Slider from "@/components/Slider";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import Controls from "@/components/HorizontalFeed/Controls";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";

const HorizontalTimeline = () => {
  const { moments } = useTimelineApiContext();
  const tokens = mapMomentsToTokens(moments);
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
