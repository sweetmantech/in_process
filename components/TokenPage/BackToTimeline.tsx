"use client";

import { useTokenProvider } from "@/providers/TokenProvider";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BackToTimeline = () => {
  const { owner } = useTokenProvider();
  const { data: artistProfile, isLoading } = useArtistProfile(owner || undefined);

  if (!owner) return null;

  if (isLoading) {
    return (
      <div className="w-full mb-4 px-3 md:px-10">
        <Skeleton className="h-6 w-40" />
      </div>
    );
  }

  const displayName = artistProfile?.username || truncateAddress(owner);

  return (
    <div className="w-full mb-4 px-3 md:px-10">
      <Link
        href={`/${owner.toLowerCase()}`}
        className="inline-flex items-center gap-2 text-grey-moss-700 hover:text-grey-moss-900 transition-colors group"
      >
        <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-archivo text-sm">
          back to {displayName}&#39;s timeline
        </span>
      </Link>
    </div>
  );
};

export default BackToTimeline; 