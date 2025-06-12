import Slider from "../Slider";
import { Autoplay } from "swiper/modules";
import useIsMobile from "@/hooks/useIsMobile";
import SliderFeed from "./SliderFeed";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";

const VerticalFeed = () => {
  const isMobile = useIsMobile();
  const { moments } = useTimelineApiContext();
  const feeds = mapMomentsToTokens(moments);

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
      className="w-full h-[770px] md:h-auto md:max-h-[100vh] !overflow-hidden"
    >
      {feeds.map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </Slider>
  );
};

export default VerticalFeed;
