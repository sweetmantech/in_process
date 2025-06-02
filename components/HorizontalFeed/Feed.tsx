import { FC } from "react";
import { Token } from "@/types/token";
import FeedHover from "./FeedHover";
import { useClickTimelineFeed } from "@/hooks/useClickTimelineFeed";
import truncated from "@/lib/truncated";
import { useUserProvider } from "@/providers/UserProvider";
import { useParams } from "next/navigation";
import { TIMLINE_STEP_OFFSET } from "@/lib/consts";
import HideButton from "./HideButton";

interface FeedProps {
  feed: Token;
  hovered: boolean;
  step: number;
  height: number;
}

const Feed: FC<FeedProps> = ({ feed, hovered, step, height }) => {
  const { isLoading, data, handleClick, formattedDate } =
    useClickTimelineFeed(feed);
  const { connectedAddress } = useUserProvider();
  const { artistAddress } = useParams();
  const isVisibleHideButton =
    Boolean(artistAddress) &&
    Boolean(
      (artistAddress as any).toLowerCase() === connectedAddress?.toLowerCase()
    );

  return (
    <div
      className="relative px-0"
      style={{
        paddingLeft: `${TIMLINE_STEP_OFFSET * step}px`,
      }}
    >
      <fieldset className="flex flex-col items-center">
        <button
          data-feed-button
          className="relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onClick={handleClick}
        >
          {hovered ? (
            <div className="size-6 bg-grey-moss-400 rounded-full -translate-x-1/2 left-[4px] md:bottom-[-2px] bottom-[0px] absolute" />
          ) : (
            <div className="size-2 border border-grey-moss-900 bg-grey-moss-100 rounded-full md:bottom-[-2px] bottom-[0px] absolute" />
          )}
          <div
            className="z-[-1] w-[0.5px] bg-black -bottom-[20px] left-[4px] absolute transition-all duration-200 ease-out"
            style={{
              height: `${height}px`,
            }}
          >
            <div className="relative size-full">
              {hovered && data && (
                <div className="absolute bottom-full">
                  <FeedHover isLoading={isLoading} data={data} />
                </div>
              )}
            </div>
          </div>
        </button>
        {hovered && (
          <div className="flex gap-2 items-center relative translate-y-6 pt-2">
            <p className="font-spectral-italic text-sm md:text-xl">
              {truncated(data?.name || "")}
            </p>
            {isVisibleHideButton && (
              <HideButton
                moment={{
                  owner: connectedAddress,
                  tokenContract: feed.collection,
                  tokenId: Number(feed.tokenId),
                }}
              />
            )}
          </div>
        )}
        <p
          className={`min-w-[200px] text-center font-archivo ${hovered ? "translate-y-6 text-sm md:text-md" : "opacity-0 md:opacity-[1] pt-8 text-xs md:text-sm"}`}
        >
          {formattedDate}
        </p>
      </fieldset>
    </div>
  );
};

export default Feed;
