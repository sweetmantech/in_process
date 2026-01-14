"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import MetadataDisplay from "../MetadataDisplay";
import Description from "../MomentPage/Description";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import { Share2Icon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import useShareMoment from "@/hooks/useShareMoment";
import Notes from "./Notes";
import { Skeleton } from "../ui/skeleton";

const SMSMoment = () => {
  const { metadata, isOwner, isSoldOut, isLoading } = useMomentProvider();
  const { share } = useShareMoment();

  if (!metadata || isLoading)
    return (
      <div className="flex flex-col gap-2 w-full px-3">
        <Skeleton className="w-1/3 h-[40px]" />
        <Skeleton className="w-1/2 h-[40px]" />
        <Skeleton className="w-3/4 h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
    );

  return (
    <div className="w-full">
      <div className="relative flex flex-col gap-10 px-3 pb-20 md:flex-row md:px-10">
        <div className="flex grow flex-col gap-4 md:flex-row md:gap-10">
          <div className="h-fit w-full md:max-w-[400px]">
            <h3 className="font-spectral text-4xl md:text-5xl">{metadata.name}</h3>
            <Description description={metadata.description || ""} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={share}
                    className="rounded-sm border border-grey-moss-900 bg-white p-1"
                    aria-label="Copy SMS link"
                  >
                    <Share2Icon className="size-4 text-grey-moss-900" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>copy link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex w-full grow justify-center">
            <div className="relative aspect-[576/700] h-fit w-full overflow-hidden font-spectral">
              <MetadataDisplay />
            </div>
          </div>
        </div>
        <div className="md:!min-w-[420px]">
          {isOwner && !isSoldOut && <MomentAirdrop />}
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default SMSMoment;
