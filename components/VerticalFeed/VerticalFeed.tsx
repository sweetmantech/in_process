import Slider from "../Slider";
import useIsMobile from "@/hooks/useIsMobile";
import SliderFeed from "./SliderFeed";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const VerticalFeed = () => {
  const isMobile = useIsMobile();
  const { moments } = useTimelineProvider();

  return (
    <Slider
      sliderProps={{
        slidesPerView: isMobile ? 3 : "auto",
        spaceBetween: 10,
        grabCursor: true,
        mousewheel: {
          sensitivity: 1,
        },
        direction: "vertical",
        threshold: 5,
        roundLengths: true,
        loop: true,
        slidesOffsetBefore: 5,
        slidesOffsetAfter: 5,
      }}
      slideClassName="!h-fit md:!h-auto"
      className="h-[770px] w-full !overflow-hidden md:h-auto md:max-h-[100vh]"
    >
      {moments.map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </Slider>
  );
};

export default VerticalFeed;
