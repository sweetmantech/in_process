"use client";

import { FC, useState } from "react";
import Feed from "./Feed";
import Slider from "../Slider";
import { Swiper } from "swiper/types";
import { Collection } from "@/types/token";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import { useStepCalculation } from "@/hooks/useStepCalculation";
import { ArrowRight } from "../ui/icons";

interface HorizontalFeedProps {
  feeds: Collection[];
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({ feeds }) => {
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const { getHeight, isHovered, handleMouseMove } =
    useHorizontalFeedAnimationProvider();
  const { calculateStep } = useStepCalculation();
  return (
    <div
      className="grow size-full flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleMouseMove({ clientX: null } as any)}
    >
      <div className="relative w-full">
        <div className="bg-black w-full h-[0.5px] absolute left-0 bottom-1/2" />
        <button
          className="absolute bottom-[44px] left-[2px] z-[2] text-black"
          type="button"
          onClick={() => swiper?.slidePrev()}
        >
          <ArrowRight className="rotate-[-180deg]" />
        </button>
        <button
          className="absolute bottom-[40px] right-[-6px] z-[2] text-black p-1"
          type="button"
          onClick={() => swiper?.slideNext()}
        >
          <ArrowRight />
        </button>
        <Slider
          sliderProps={{
            slidesPerView: "auto",
            grabCursor: true,
            mousewheel: {
              sensitivity: 1,
            },
            onSwiper(swiper) {
              setSwiper(swiper);
            },
          }}
          className="w-full !overflow-visible my-4"
          slideClassName="!w-fit !m-0"
        >
          {feeds.map((feed: Collection, i) => (
            <Feed
              key={i}
              feed={feed}
              hovered={isHovered(i)}
              step={calculateStep(i, feeds)}
              height={getHeight(i)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HorizontalFeed;
