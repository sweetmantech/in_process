import SliderFeed from "./SliderFeed";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const VerticalFeed = () => {
  const { moments } = useTimelineProvider();

  return (
    <div className="w-full h-[770px] overflow-y-auto">
      {moments.map((feed, i) => (
        <SliderFeed feed={feed} key={i} />
      ))}
    </div>
  );
};

export default VerticalFeed;
