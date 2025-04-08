import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import React from "react";
import { ArrowRight } from "../ui/icons";

const Controls = () => {
  const { activeIndex, swiper, feedEnded, timelineOverflowed } =
    useHorizontalFeedAnimationProvider();

  return (
    <React.Fragment>
      {activeIndex > 1 && (
        <button
          className="absolute bottom-[53px] md:bottom-[58px] left-0 md:left-[2px] z-[2] text-black"
          type="button"
          onClick={() => swiper?.slidePrev()}
        >
          <ArrowRight className="rotate-[-180deg]" />
        </button>
      )}
      {timelineOverflowed && !feedEnded && (
        <button
          className="absolute bottom-[49px] md:bottom-[54px] right-[-4px] md:right-[-6px] z-[2] text-black p-1"
          type="button"
          onClick={() => swiper?.slideNext()}
        >
          <ArrowRight />
        </button>
      )}
    </React.Fragment>
  );
};

export default Controls;
