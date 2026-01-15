"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import MetadataDisplay from "../MetadataDisplay";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import { Share2Icon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import useShareMoment from "@/hooks/useShareMoment";
import Notes from "./Notes";
import { Skeleton } from "../ui/skeleton";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import CollectionImage from "../CollectionImage";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import SaveMediaButton from "../MomentManagePage/SaveMediaButton";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import TitleInput from "../Media/TitleInput";
import DescriptionInput from "../Media/DescriptionInput";
import Description from "../MomentPage/Description";

const SMSMoment = () => {
  const { metadata, isOwner, isSoldOut, isLoading } = useMomentProvider();
  const { share } = useShareMoment();
  const { fileInputRef, blobUrls, previewFileUrl } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();
  const { isLoading: isUpdating } = useMomentUriUpdateProvider();
  const canEdit = isOwner && !isUpdating;

  useMediaInitialization(metadata ?? undefined);

  const handleImageClick = () => {
    if (isOwner && !isUpdating) {
      fileInputRef.current?.click();
    }
  };

  const imageUrl =
    blobUrls?.image ||
    previewFileUrl ||
    getFetchableUrl(metadata?.image) ||
    "/images/placeholder.png";

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
            <div className="flex items-center gap-2 md:block">
              <div className="md:hidden">
                <CollectionImage
                  src={imageUrl}
                  alt={metadata.name || "Moment thumbnail"}
                  className="h-14 w-14"
                  onClick={isOwner ? handleImageClick : undefined}
                />
              </div>
              {isOwner ? (
                <TitleInput disabled={!canEdit} labelHidden />
              ) : (
                <p className="font-archivo text-lg text-grey-moss-900">{metadata.name}</p>
              )}
            </div>
            {isOwner ? (
              <DescriptionInput disabled={!canEdit} labelHidden />
            ) : (
              <Description description={metadata.description || ""} />
            )}
            <div className="flex items-center gap-2 mt-4">
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
              {isOwner && <SaveMediaButton />}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={selectFile}
              className="hidden"
              disabled={!isOwner || isUpdating}
            />
          </div>
          <div className="hidden md:flex w-full grow justify-center">
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
