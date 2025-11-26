import { useTimelineApiContext } from "@/providers/legacy/TimelineApiProvider";
import GridItem from "./GridItem";

const GridFeed = () => {
  const { moments } = useTimelineApiContext();

  return (
    <div className="w-full px-10 grid grid-cols-4 gap-4">
      {moments.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
