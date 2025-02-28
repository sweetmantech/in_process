import { Collection } from "@/types/token";
import Slider from "../Slider";
import SliderFeed from "./SliderFeed";
import { Autoplay } from "swiper/modules";

interface ArtSliderProps {
  feeds: Collection[];
}

const ArtSlider = ({ feeds }: ArtSliderProps) => {
  return (
    <Slider
      sliderProps={{
        slidesPerView: "auto",
        grabCursor: true,
        mousewheel: {
          sensitivity: 1,
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        direction: "vertical",
        modules: [Autoplay],
      }}
      className="w-full max-h-[1000px] !overflow-hidden"
    >
      {feeds.slice(0, 10).map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </Slider>
  );
};

export default ArtSlider;
