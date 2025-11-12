"use client";
import { Fragment, useRef } from "react";

import { useTokenProvider } from "@/providers/TokenProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";
import OwnerWarning from "./OwnerWarning";
import SaveMediaButton from "./SaveMediaButton";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";
import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import useUpdateTokenURI from "@/hooks/useUpdateTokenURI";
import useMediaInitialization from "@/hooks/useMediaInitialization";

const Media = () => {
  const { metadata, isOwner } = useTokenProvider();
  const {
    imageUri,
    animationUri,
    mimeType,
    fileUpload,
    fileUploading,
    pctComplete,
    previewSrc,
    form,
    setImageUri,
    setAnimationUri,
  } = useMomentManageProvider();
  const { data: meta, isLoading } = metadata;
  const { isLoading: isSaving } = useUpdateTokenURI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useMediaInitialization(meta);

  const hasMedia = imageUri || animationUri || fileUploading;

  const openFileDialog = () => {
    if (isOwner && !isSaving) {
      fileInputRef.current?.click();
    }
  };

  const handleReset = () => {
    setImageUri("");
    setAnimationUri("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading || !meta) {
    return <MediaSkeleton />;
  }

  return (
    <Fragment>
      <div className="px-4 md:px-10 w-full font-archivo">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mt-4">
          <div className="space-y-4">
            <div>
              <label className="font-archivo text-sm text-grey-moss-600 block mb-1">title</label>
              <Input
                type="text"
                {...form.register("name")}
                placeholder="enter a title"
                disabled={!isOwner || isSaving}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 font-archivo mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
                description
              </label>
              <Textarea
                {...form.register("description")}
                className="font-archivo focus:border-grey-moss-500"
                minRows={3}
                placeholder="enter a description"
                disabled={!isOwner || isSaving}
              />
              {form.formState.errors.description && (
                <p className="text-xs text-red-500 font-archivo mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="min-h-[400px] md:min-h-auto md:aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
              <input
                ref={fileInputRef}
                id="media"
                type="file"
                className={`cursor-pointer ${hasMedia ? "hidden" : "z-2 size-full absolute opacity-0"}`}
                onChange={fileUpload}
                disabled={!isOwner || isSaving}
              />
              {hasMedia ? (
                <>
                  {isOwner && !isSaving && (
                    <ResetButton onClick={handleReset} disabled={fileUploading} />
                  )}
                  <MediaUploaded
                    handleImageClick={openFileDialog}
                    fileUploading={fileUploading}
                    mimeType={mimeType || ""}
                    animationUri={animationUri}
                    imageUri={imageUri}
                    pctComplete={pctComplete}
                    previewSrc={previewSrc}
                  />
                </>
              ) : (
                <NoFileSelected />
              )}
            </div>

            <SaveMediaButton />
            <OwnerWarning />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Media;
