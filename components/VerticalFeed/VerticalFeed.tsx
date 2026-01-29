import SliderFeed from "./SliderFeed";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const VerticalFeed = () => {
  const { moments } = useTimelineProvider();

  return (
    <div className="w-full h-[770px] overflow-y-auto space-y-4">
      {moments.map((feed) => (
        <SliderFeed feed={feed} key={feed.id} />
      ))}
    </div>
  );
};

export default VerticalFeed;
