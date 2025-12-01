import { useTimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import React from "react";
import { ArrowRight } from "../ui/icons";

const Controls = () => {
  const { activeIndex, swiper, momentEnded, timelineOverflowed } = useTimelineAnimationProvider();

  return (
    <div className="px-1 flex justify-between z-[999999] size-full absolute flex items-center left-0 top-0">
      {activeIndex > 1 && (
        <button className="text-black" type="button" onClick={() => swiper?.slidePrev()}>
          <ArrowRight className="rotate-[-180deg] w-6 h-6" />
        </button>
      )}
      {timelineOverflowed && !momentEnded && (
        <button
          className="text-black p-1 ml-auto"
          type="button"
          onClick={() => swiper?.slideNext()}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Controls;
