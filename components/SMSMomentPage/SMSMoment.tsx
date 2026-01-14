"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import MetadataDisplay from "../MetadataDisplay";
import Description from "../MomentPage/Description";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import { Share2Icon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import useShareMoment from "@/hooks/useShareMoment";
import { Skeleton } from "../ui/skeleton";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import Notes from "./Notes";

const SMSMoment = () => {
  const { metadata, isOwner, isSoldOut, saleConfig, isLoading, isSetSale } = useMomentProvider();
  const { share } = useShareMoment();

  if (!metadata) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="relative flex flex-col gap-10 px-3 pb-20 md:flex-row md:px-10">
        <div className="flex grow flex-col gap-4 md:flex-row md:gap-10">
          <div className="h-fit w-full md:max-w-[400px]">
            <h3 className="font-spectral text-4xl md:text-5xl">{metadata.name}</h3>
            <Description description={metadata.description || ""} />
            {isSetSale && (
              <>
                <div className="mt-2 space-y-1 md:mt-4 md:space-y-2">
                  <p className="font-archivo text-sm md:text-lg">moment collection price</p>
                  {isLoading ? (
                    <Skeleton className="h-6 w-full" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="w-2/3 rounded-md border border-black bg-grey-moss-50 text-center font-archivo text-sm md:w-full md:text-base">
                        {BigInt(saleConfig?.pricePerToken) === BigInt(0)
                          ? "free"
                          : `${getPrice(saleConfig?.pricePerToken || BigInt(0), saleConfig?.type)} ${getPriceUnit(saleConfig?.type || "")}`}
                      </p>
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
                  )}
                </div>
              </>
            )}
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
