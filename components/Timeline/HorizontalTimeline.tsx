"use client";

import { useInProcessTimelineProvider } from "@/providers/InProcessTimelineProvider";
import Slider from "@/components/Slider";
import { useTimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import Controls from "@/components/HorizontalMoments/Controls";
import TimelineMoment from "@/components/HorizontalMoments/TimelineMoment";

const HorizontalTimeline = () => {
  const { moments } = useInProcessTimelineProvider();
  const {
    getHeight,
    isHovered,
    handleMouseMove,
    setActiveIndex,
    setFeedEnded,
    setSwiper,
    containerRef,
    timelineRef,
  } = useTimelineAnimationProvider();

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
            initialSlide: Math.max(0, moments.length - 1),
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
          {moments.map((moment, i) => (
            <TimelineMoment
              key={i}
              moment={moment}
              hovered={isHovered(i)}
              step={1}
              height={getHeight(i)}
              index={i}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HorizontalTimeline;
