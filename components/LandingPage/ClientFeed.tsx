'use client';

import { useLatestFeed } from "@/hooks/useLatestFeed";
import HorizontalFeed from "../HorizontalFeed";
import { Skeleton } from "../ui/skeleton";
import { FC } from "react";
import type { NftMetadata } from "@/lib/dune/getLatestFeed";

const LoadingSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="w-72 h-72 flex-shrink-0" />
      ))}
    </div>
  </div>
);

interface ClientFeedProps {
  initialData: NftMetadata[];
}

const ClientFeed: FC<ClientFeedProps> = ({ initialData }) => {
  const { error, isLoading, data } = useLatestFeed({
    initialData,
  });

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  
  if (isLoading && !data) return <LoadingSkeleton />;
  
  return <HorizontalFeed feed={data || initialData} />;
};

export default ClientFeed;