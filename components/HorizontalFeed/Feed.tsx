import { FC } from "react";
import EnsName from "../EnsName";
import { Collection } from "@/types/token";
import FeedHover from "./FeedHover";
import { useFeed } from "@/hooks/useFeed";

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
  const { isLoading, data, handleClick, formattedDate } = useFeed(
    feed,
    shouldCollect,
  );

  return (
    <div
      className="relative max-w-fit"
      style={{
        paddingLeft: `${16 + step * 10}px`,
      }}
    >
      <fieldset className="flex flex-col items-center mt-14">
        <button
          data-feed-button
          className="size-2 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onClick={handleClick}
        >
          <div
            className="w-0.5 bg-black -bottom-6 left-[3px] absolute transition-all duration-200 ease-out"
            style={{
              height: `${height}px`,
            }}
          >
            <div className="relative size-full">
              {hovered && (
                <div className="absolute bottom-full">
                  <FeedHover
                    isLoading={isLoading}
                    data={data}
                    name={feed.name}
                  />
                </div>
              )}
            </div>
          </div>
        </button>
        <section className="pt-6">
          {shouldCollect ? (
            <p className="text-center">{feed.name}</p>
          ) : (
            <EnsName
              address={feed.creator}
              className="text-center text-sm leading-[100%] pt-1"
            />
          )}
          <p className="text-xs text-center">{formattedDate}</p>
        </section>
      </fieldset>
    </div>
  );
};

export default Feed;
