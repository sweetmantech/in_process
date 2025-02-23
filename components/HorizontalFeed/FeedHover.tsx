import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Metadata } from "@/types/token";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface FeedHoverProps {
  isLoading: boolean;
  data: Metadata | undefined;
  name: string;
}

const FeedHover: FC<FeedHoverProps> = ({ isLoading, data, name }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 md:p-4 transition-opacity duration-200 ease-out">
      <div className="w-[60px] md:w-[150px] aspect-[1/1] overflow-hidden relative">
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : (
          <Image
            src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
            alt={data?.name || ""}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            blurDataURL={data?.image}
            unoptimized
          />
        )}
      </div>
      <h3 className="font-semibold text-sm text-center mt-1">
        {isLoading ? (
          <Skeleton className="h-4 w-full rounded-xs" />
        ) : (
          data?.name || name
        )}
      </h3>
    </div>
  );
};

export default FeedHover;
