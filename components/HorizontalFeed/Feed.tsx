import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import { FC } from "react";
import EnsName from "../EnsName";
import { Collection } from "@/types/token";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import FeedHover from "./FeedHover";

interface FeedProps {
  feed: Collection;
  hovered: boolean;
  shouldCollect: boolean;
  step: number;
  height: number;
}

const Feed: FC<FeedProps> = ({
  feed,
  hovered,
  step,
  shouldCollect,
  height,
}) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(feed.contractURI);
  const handleClick = (feed: Collection) => {
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
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
        {hovered && (
          <div className="absolute bottom-[140px]">
            <FeedHover isLoading={isLoading} data={data} name={feed.name} />
          </div>
        )}
        <button
          data-feed-button
          className="size-2 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onClick={() => handleClick(feed)}
        >
          <div
            className="w-0.5 bg-black -bottom-3 left-[3px] absolute transition-all duration-200 ease-out"
            style={{
              height: `${height}px`,
            }}
          />
        </button>
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
    </div>
  );
};

export default Feed;
