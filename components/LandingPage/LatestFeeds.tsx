import { Collection } from "@/types/token";
import Image from "next/image";
import truncated from "@/lib/truncated";
import ArtistName from "../ArtistName";

interface LatestFeedsProps {
  feeds: Collection[];
}

const Feed = ({ feed }: { feed: Collection }) => {
  const title = feed.name;

  return (
    <div className="flex items-start justify-between p-4">
      <div>
        <p className="font-spectral text-base">{truncated(title)}</p>
        <p className="font-archivo text-[11px]">
          {new Date(feed.released_at).toLocaleString()}
        </p>
      </div>
      <ArtistName
        className="font-archivo text-sm"
        address={feed.defaultAdmin}
      />
    </div>
  );
};
const LatestFeeds = ({ feeds }: LatestFeedsProps) => {
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
      {feeds.map((ele, i) => (
        <Feed key={i} feed={ele} />
      ))}
    </div>
  );
};

export default LatestFeeds;
