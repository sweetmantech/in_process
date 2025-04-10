import GridItem from "./GridItem";
import { useFeedProvider } from "@/providers/FeedProvider";

const GridFeed = () => {
  const { feeds } = useFeedProvider();

  return (
    <div className="w-full px-10 grid grid-cols-4 gap-4">
      {feeds.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
