import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { Collection } from "@/types/token";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import truncated from "@/lib/truncated";

interface LatestFeedsProps {
  feeds: Collection[];
}

const Feed = ({ feed }: { feed: Collection }) => {
  const { isLoading, data } = useMetadata(feed.contractURI);
  const title = data?.description || feed.name;

  return (
    <div className="flex items-start justify-between p-4">
      {isLoading ? (
        <Skeleton className="size-20" />
      ) : (
        <>
          <div>
            <p className="font-spectral text-base">{truncated(title)}</p>
            <p className="font-archivo text-[11px]">
              {new Date(feed.released_at).toLocaleString()}
            </p>
          </div>
          <p className="font-archivo text-sm">
            {truncateAddress(feed.creator)}
          </p>
        </>
      )}
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
