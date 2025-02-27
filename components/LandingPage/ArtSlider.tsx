import { Collection } from "@/types/token";
import Slider from "../Slider";
import { useState } from "react";
import { Swiper } from "swiper/types";
import SliderFeed from "./SliderFeed";

interface ArtSliderProps {
  feeds: Collection[];
}

const ArtSlider = ({ feeds }: ArtSliderProps) => {
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  return (
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
        direction: "vertical",
      }}
      className="w-full max-h-[600px] !overflow-hidden"
    >
      {feeds.map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </Slider>
  );
};

export default ArtSlider;
