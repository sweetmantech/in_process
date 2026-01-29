import { useTimelineProvider } from "@/providers/TimelineProvider";
import GridItem from "./GridItem";

const GridFeed = () => {
  const { moments } = useTimelineProvider();

  return (
    <div className="grid w-full grid-cols-2 gap-3 px-4 md:grid-cols-5 md:px-10">
      {moments.map((feed) => (
        <GridItem key={feed.id} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
