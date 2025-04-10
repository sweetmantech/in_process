import { Token } from "@/types/token";
import Image from "next/image";
import truncated from "@/lib/truncated";
import ArtistName from "../ArtistName";
import { useFeedProvider } from "@/providers/FeedProvider";
import { useMetadata } from "@/hooks/useMetadata";

const Feed = ({ feed }: { feed: Token }) => {
  const { data } = useMetadata(feed.uri);
  return (
    <div className="flex items-start justify-between p-4">
      <div>
        <p className="font-spectral text-base">{truncated(data?.name || "")}</p>
        <p className="font-archivo text-[11px]">
          {new Date(feed.released_at).toLocaleString()}
        </p>
      </div>
      <ArtistName className="font-archivo text-sm" address={feed.creator} />
    </div>
  );
};
const LatestFeeds = () => {
  const { feeds } = useFeedProvider();
  return (
    <div className="pt-4 block md:hidden w-full">
      <div className="flex justify-center">
        <Image
          src="/star.svg"
          blurDataURL="/star.png"
          width={23}
          height={23}
          alt="not found start"
        />
      </div>
      {feeds.slice(0, 3).map((feed, i) => (
        <Feed key={i} feed={feed} />
      ))}
    </div>
  );
};

export default LatestFeeds;
