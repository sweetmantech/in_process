import Slider from "../Slider";
import SliderFeed from "./SliderFeed";
import { Autoplay } from "swiper/modules";
import useIsMobile from "@/hooks/useIsMobile";
import { ArrowRight } from "../ui/icons";
import { useState } from "react";
import { Swiper } from "swiper/types";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";

const ArtSlider = () => {
  const isMobile = useIsMobile();
  const { moments } = useTimelineApiContext();
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const slides = mapMomentsToTokens(moments).slice(0, 55);

  return (
    <div className="relative h-full">
      <button
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-gray-400 px-4 rounded-md"
        onClick={() => swiper?.slidePrev()}
      >
        <ArrowRight className="rotate-[-90deg] size-6" />
      </button>
      <button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-gray-400 px-4 rounded-md"
        onClick={() => swiper?.slideNext()}
      >
        <ArrowRight className="rotate-[-270deg] size-6" />
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
        className="w-full h-full !overflow-hidden"
      >
        {slides.map((feed, i) => (
          <SliderFeed feed={feed} key={i} />
        ))}
      </Slider>
    </div>
  );
};

export default ArtSlider;
