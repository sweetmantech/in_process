import { useMetadata } from "@/hooks/useMetadata";
import { LatestFeed, NftMetadata } from "@/lib/viem/getUris";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { getIpfsLink } from "@/lib/utils";
import truncateAddress from "@/lib/truncateAddress";
import EnsName from "../EnsName";

interface FeedProps {
  feed: LatestFeed;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  shouldCollect: boolean;
  step: number;
}
const Feed: FC<FeedProps> = ({ feed, onHover, onLeave, hovered, step }) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(feed);
  const handleClick = (feed: LatestFeed) => {
    push(`/${feed.owner}`);
  };
  return (
    <div
      className="relative max-w-fit"
      style={{
        paddingLeft: `${16 + step}px`,
      }}
    >
      <div className="bg-gray-300 w-full h-0.5 absolute translate-y-2 left-0" />
      <fieldset className="flex flex-col items-center mt-9">
        <button
          className="w-5 h-5 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={() => handleClick(feed)}
        />
        <EnsName address={feed.owner} className="text-sm leading-[100%] pt-1" />
        <p className="text-xs">
          {new Date(feed.release_date).toLocaleString()}
        </p>
      </fieldset>
      {hovered && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-lg p-2 md:p-4 transition-opacity duration-200 ease-in-out">
          <div className="w-[60px] md:w-[150px] aspect-[1/1] overflow-hidden relative">
            {isLoading ? (
              <Skeleton className="size-full" />
            ) : (
              <Image
                src={
                  getIpfsLink((data as NftMetadata)?.image) ||
                  "/images/placeholder.png"
                }
                alt={(data as NftMetadata).name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                blurDataURL={(data as NftMetadata).image}
              />
            )}
          </div>
          <h3 className="font-semibold text-sm text-center mt-1">
            {isLoading ? (
              <Skeleton className="h-4 w-full rounded-xs" />
            ) : (
              (data as NftMetadata)?.name ||
              truncateAddress(feed.nft_contract_address)
            )}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Feed;
