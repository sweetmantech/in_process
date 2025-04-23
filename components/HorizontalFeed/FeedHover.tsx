import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { Metadata } from "@/types/token";
import ContentRenderer from "../Token/ContentRenderer";

interface FeedHoverProps {
  isLoading: boolean;
  data: Metadata;
}

const FeedHover: FC<FeedHoverProps> = ({ isLoading, data }) => {
  return (
    <div className="-translate-x-1/2 border border-grey-moss-900 shadow-lg transition-opacity duration-200 ease-out">
      <div className="w-[150px] md:w-[360px] aspect-[360/248] overflow-hidden relative bg-tan-400">
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : (
          <ContentRenderer metadata={data} />
        )}
      </div>
    </div>
  );
};

export default FeedHover;
