import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { Metadata } from "@/types/token";
import ContentRenderer from "../Renderers/ContentRenderer";

interface FeedHoverProps {
  isLoading: boolean;
  data: Metadata;
}

const FeedHover: FC<FeedHoverProps> = ({ isLoading, data }) => {
  return (
    <div className="-translate-x-1/2 border border-grey-moss-900 shadow-lg transition-opacity duration-200 ease-out">
      <div className="w-[200px] md:w-[300px] aspect-[360/248] overflow-hidden relative bg-grey-moss-100 !font-spectral">
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
