import { FC } from "react";
import { Token } from "@/types/token";
import FeedHover from "./FeedHover";
import { useClickTimelineFeed } from "@/hooks/useClickTimelineFeed";
import { DiamondIcon } from "../ui/icons";
import truncated from "@/lib/truncated";

interface FeedProps {
  feed: Token;
  hovered: boolean;
  step: number;
  height: number;
}

const Feed: FC<FeedProps> = ({ feed, hovered, step, height }) => {
  const { isLoading, data, handleClick, formattedDate } =
    useClickTimelineFeed(feed);

  return (
    <div
      className="relative max-w-fit"
      style={{
        paddingLeft: `${16 + step * 10}px`,
      }}
    >
      <fieldset className="flex flex-col items-center mt-[54px]">
        <button
          data-feed-button
          className="relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onClick={handleClick}
        >
          {hovered ? (
            <DiamondIcon
              className="absolute left-[-12px] top-[-19px]"
              stroke="#810505"
              fill="#810505"
            />
          ) : (
            <div className="size-2 bg-black rotate-[45deg]" />
          )}
          <div
            className={`w-[0.5px] bg-black -bottom-6 left-[4px] absolute transition-all duration-200 ease-out ${hovered && "bg-red-dark"}`}
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
          <p className="font-spectral-italic text-sm md:text-xl pt-2 relative translate-y-6">
            {truncated(data?.name || "")}
          </p>
        )}
        <p
          className={`text-center font-archivo ${hovered ? "translate-y-6 text-sm md:text-md" : "opacity-0 md:opacity-[1] pt-8 text-xs md:text-sm"}`}
        >
          {formattedDate}
        </p>
      </fieldset>
    </div>
  );
};

export default Feed;
