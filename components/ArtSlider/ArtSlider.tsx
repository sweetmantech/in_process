import Slider from "../Slider";
import SliderFeed from "./SliderFeed";
import { Autoplay } from "swiper/modules";
import useIsMobile from "@/hooks/useIsMobile";
import { ArrowRight } from "../ui/icons";
import { useState } from "react";
import { Swiper } from "swiper/types";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const ArtSlider = () => {
  const isMobile = useIsMobile();
  const { moments } = useTimelineProvider();
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const slides = moments.slice(0, 55);

  return (
    <div className="relative h-full">
      <button
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-md bg-gray-400 px-4"
        onClick={() => swiper?.slidePrev()}
      >
        <ArrowRight className="size-6 rotate-[-90deg]" />
      </button>
      <button
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-md bg-gray-400 px-4"
        onClick={() => swiper?.slideNext()}
      >
        <ArrowRight className="size-6 rotate-[-270deg]" />
      </button>
      <Slider
        sliderProps={{
          slidesPerView: isMobile ? 3 : "auto",
          spaceBetween: 10,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          direction: "vertical",
          modules: [Autoplay],
          threshold: 5,
          roundLengths: true,
          loop: true,
          slidesOffsetBefore: 5,
          slidesOffsetAfter: 5,
          draggable: false,
          onSwiper(swiper) {
            setSwiper(swiper);
          },
          allowTouchMove: false,
        }}
        slideClassName="!h-fit md:!h-auto"
        className="h-full w-full !overflow-hidden"
      >
        {slides.map((feed, i) => (
          <SliderFeed feed={feed} key={i} />
        ))}
      </Slider>
    </div>
  );
};

export default ArtSlider;
