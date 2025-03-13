import { Collection } from "@/types/token";
import GridItem from "./GridItem";

interface GridFeedProps {
  feeds: Collection[];
}

const GridFeed = ({ feeds }: GridFeedProps) => {
  return (
    <div className="w-full px-10 grid grid-cols-4 gap-4">
      {feeds.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
