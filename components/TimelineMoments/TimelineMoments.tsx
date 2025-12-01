"use client";

import { FC } from "react";
import Moment from "./Moment";
import Slider from "../Slider";
import { TimelineMoment } from "@/types/moment";
import { useTimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import Controls from "./Controls";
import FetchMoreInspector from "../FetchMoreInspector";

interface TimelineMomentsProps {
  moments: TimelineMoment[];
  fetchMore?: () => void;
}

const TimelineMoments: FC<TimelineMomentsProps> = ({ moments, fetchMore = () => {} }) => {
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
              setMomentEnded(progress === 1);
            },
          }}
          className="w-full !overflow-visible !h-0"
          slideClassName="!w-fit !m-0"
        >
          {Array.from({ length: moments.length + 1 }).map((_, i) => (
            <>
              {i < moments.length ? (
                <Moment
                  key={i}
                  moment={moments[i]}
                  hovered={isHovered(i)}
                  step={1}
                  height={getHeight(i)}
                  index={i}
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

export default TimelineMoments;
