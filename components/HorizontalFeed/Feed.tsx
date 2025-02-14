import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { getIpfsLink } from "@/lib/utils";
import EnsName from "../EnsName";
import { Collection, Metadata } from "@/types/token";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

interface FeedProps {
  feed: Collection;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  shouldCollect: boolean;
  step: number;
}
const Feed: FC<FeedProps> = ({
  feed,
  onHover,
  onLeave,
  hovered,
  step,
  shouldCollect,
}) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(feed);
  const handleClick = (feed: Collection) => {
    if (shouldCollect) {
      const shortNetworkName = getShortNetworkName(
        feed.chain.replaceAll("_", " "),
      );
      push(`/collect/${shortNetworkName}:${feed.newContract}/1`);
      return;
    }
    push(`/${feed.creator}`);
  };

  return (
    <div
      className="relative max-w-fit"
      style={{
        paddingLeft: `${16 + step * 10}px`,
      }}
    >
      <fieldset className="flex flex-col items-center mt-9">
        <button
          className="w-5 h-5 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={() => handleClick(feed)}
        />
        {shouldCollect ? (
          <p>{feed.name}</p>
        ) : (
          <EnsName
            address={feed.creator}
            className="text-sm leading-[100%] pt-1"
          />
        )}
        <p className="text-xs">{new Date(feed.released_at).toLocaleString()}</p>
      </fieldset>
      {hovered && (
        <div className="absolute bottom-14 mb-2 bg-white shadow-lg rounded-lg p-2 md:p-4 transition-opacity duration-200 ease-in-out">
          <div className="w-[60px] md:w-[150px] aspect-[1/1] overflow-hidden relative">
            {isLoading ? (
              <Skeleton className="size-full" />
            ) : (
              <Image
                src={
                  getIpfsLink((data as Metadata)?.image) ||
                  "/images/placeholder.png"
                }
                alt={(data as Metadata).name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                blurDataURL={(data as Metadata).image}
              />
            )}
          </div>
          <h3 className="font-semibold text-sm text-center mt-1">
            {isLoading ? (
              <Skeleton className="h-4 w-full rounded-xs" />
            ) : (
              (data as Metadata)?.name || feed.name
            )}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Feed;
