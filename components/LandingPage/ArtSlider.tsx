import Slider from "../Slider";
import SliderFeed from "./SliderFeed";
import { Autoplay } from "swiper/modules";
import useIsMobile from "@/hooks/useIsMobile";
import { useFeedProvider } from "@/providers/FeedProvider";
import { ArrowRight } from "../ui/icons";
import { useState } from "react";
import { Swiper } from "swiper/types";

const ArtSlider = () => {
  const isMobile = useIsMobile();
  const { feeds } = useFeedProvider();
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  return (
    <div className="relative">
      <button className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-gray-400 px-4 rounded-md">
        <ArrowRight
          className="rotate-[-90deg] size-6"
          onClick={() => swiper?.slidePrev()}
        />
      </button>
      <button className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-gray-400 px-4 rounded-md">
        <ArrowRight
          className="rotate-[-270deg] size-6"
          onClick={() => swiper?.slideNext()}
        />
      </button>
      <Slider
        sliderProps={{
          slidesPerView: isMobile ? 3 : "auto",
          spaceBetween: 10,
          mousewheel: {
            sensitivity: 1,
          },
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
        }}
        slideClassName="!h-fit md:!h-auto"
        className="w-full h-[630px] md:h-auto md:max-h-[100vh] !overflow-hidden !pointer-events-none"
      >
        {feeds.slice(0, 10).map((feed, i) => (
          <SliderFeed feed={feed} key={i} />
        ))}
      </Slider>
    </div>
  );
};

export default ArtSlider;
