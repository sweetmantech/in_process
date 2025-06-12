import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import GridItem from "./GridItem";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";

const GridFeed = () => {
  const { moments } = useTimelineApiContext();
  const feeds = mapMomentsToTokens(moments);

  return (
    <div className="w-full px-10 grid grid-cols-4 gap-4">
      {feeds.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
