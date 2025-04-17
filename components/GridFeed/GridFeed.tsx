import { useArtistFeedProvider } from "@/providers/ArtistFeedProvider";
import GridItem from "./GridItem";

const GridFeed = () => {
  const { feeds } = useArtistFeedProvider();

  return (
    <div className="w-full px-10 grid grid-cols-4 gap-4">
      {feeds.map((feed, i) => (
        <GridItem key={i} feed={feed} />
      ))}
    </div>
  );
};

export default GridFeed;
