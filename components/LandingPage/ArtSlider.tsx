import { Collection } from "@/types/token";
import Slider from "../Slider";
import SliderFeed from "./SliderFeed";

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
