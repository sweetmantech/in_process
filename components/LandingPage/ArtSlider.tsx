import Slider from "../Slider";
import SliderFeed from "./SliderFeed";
import { Autoplay } from "swiper/modules";
import useIsMobile from "@/hooks/useIsMobile";
import { useFeedProvider } from "@/providers/FeedProvider";

const ArtSlider = () => {
  const isMobile = useIsMobile();
  const { feeds } = useFeedProvider();

  return (
    <Slider
      sliderProps={{
        slidesPerView: isMobile ? 3 : "auto",
        spaceBetween: 10,
        grabCursor: true,
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
      }}
      slideClassName="!h-fit md:!h-auto"
      className="w-full h-[630px] md:h-auto md:max-h-[100vh] !overflow-hidden"
    >
      {feeds.slice(0, 10).map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </Slider>
  );
};

export default ArtSlider;
