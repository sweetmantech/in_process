import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Metadata } from "@/types/token";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface FeedHoverProps {
  isLoading: boolean;
  data: Metadata | undefined;
}

const FeedHover: FC<FeedHoverProps> = ({ isLoading, data }) => {
  return (
    <div className="-translate-x-1/2 border border-red-dark shadow-lg transition-opacity duration-200 ease-out">
      <div className="w-[150px] md:w-[360px] aspect-[360/248] overflow-hidden relative">
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : (
          <Image
            src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
            alt={data?.name || ""}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            blurDataURL={data?.image}
            unoptimized
          />
        )}
      </div>
    </div>
  );
};

export default FeedHover;
