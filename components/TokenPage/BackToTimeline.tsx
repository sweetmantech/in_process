"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BackToTimeline = () => {
  const { owner } = useMomentProvider();
  const { data: artistProfile, isLoading } = useArtistProfile(owner || undefined);

  if (!owner) return null;

  if (isLoading) {
    return (
      <div className="mb-4 w-full px-3 md:px-10">
        <Skeleton className="h-6 w-40" />
      </div>
    );
  }

  const displayName = artistProfile?.username || truncateAddress(owner);

  return (
    <div className="mb-4 w-full px-3 md:px-10">
      <Link
        href={`/${owner.toLowerCase()}`}
        className="text-grey-moss-700 group inline-flex items-center gap-2 transition-colors hover:text-grey-moss-900"
      >
        <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        <span className="font-archivo text-sm">back to {displayName}&#39;s timeline</span>
      </Link>
    </div>
  );
};

export default BackToTimeline;
