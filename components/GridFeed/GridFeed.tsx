import { useTimelineProvider } from "@/providers/TimelineProvider";
import GridItem from "./GridItem";

const GridFeed = () => {
  const { moments } = useTimelineProvider();

  return (
    <div className="grid w-full grid-cols-4 gap-4 px-10">
      {moments.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
