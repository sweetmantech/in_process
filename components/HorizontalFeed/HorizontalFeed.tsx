"use client";

import { FC, useState } from "react";
import Feed from "./Feed";
import Slider from "../Slider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper } from "swiper/types";
import { Collection } from "@/types/token";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import { useStepCalculation } from "@/hooks/useStepCalculation";

interface HorizontalFeedProps {
  feeds: Collection[];
  shouldCollect?: boolean;
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({
  feeds,
  shouldCollect = false,
}) => {
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const { getHeight, isHovered, handleMouseMove } =
    useHorizontalFeedAnimationProvider();
  const { calculateStep } = useStepCalculation();

  return (
    <div
      className="relative size-full flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleMouseMove({ clientX: null } as any)}
    >
      <div className="relative w-full">
        <div className="bg-gray-300 w-full h-0.5 absolute left-0 bottom-1/2" />
        <button className="absolute bottom-1/3 z-[2] rounded-full bg-black text-white p-1">
          <ArrowLeft className="size-6" onClick={() => swiper?.slidePrev()} />
        </button>
        <button className="absolute bottom-1/3 right-0 z-[2] rounded-full bg-black text-white p-1">
          <ArrowRight className="size-6" onClick={() => swiper?.slideNext()} />
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
              shouldCollect={shouldCollect}
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
