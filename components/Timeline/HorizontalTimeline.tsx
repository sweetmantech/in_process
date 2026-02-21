"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import Moment from "@/components/TimelineMoments/Moment";
import Slider from "@/components/Slider";
import { useTimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import Controls from "@/components/TimelineMoments/Controls";

const HorizontalTimeline = () => {
  const { moments } = useTimelineProvider();
  const {
    getHeight,
    isHovered,
    handleMouseMove,
    setActiveIndex,
    setMomentEnded,
    setSwiper,
    containerRef,
    timelineRef,
  } = useTimelineAnimationProvider();

  return (
    <div
      className="relative flex size-full grow items-end justify-center overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleMouseMove({ clientX: null } as any)}
      ref={containerRef}
    >
      <div className="pointer-events-none absolute left-0 top-0 flex size-full items-end">
        <div className="h-[0.5px] w-full bg-black" />
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
              setMomentEnded(progress === 1);
            },
          }}
          className="!h-0 w-full !overflow-visible"
          slideClassName="!w-fit !m-0"
        >
          {moments.reverse().map((moment, i) => (
            <Moment
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
