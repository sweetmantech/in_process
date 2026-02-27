"use client";

import { Fragment, useState, ReactNode } from "react";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import ContentRenderer from "@/components/Renderers";
import ResetButton from "../MetadataCreation/ResetButton";
import AnimationUpload from "./AnimationUpload";
import MediaSkeleton from "./MediaSkeleton";
import OwnerWarning from "./OwnerWarning";
import { TokenMetadataJson } from "@/lib/protocolSdk";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";

interface MediaProps {
  metadata: TokenMetadataJson | null;
  isOwner: boolean;
  isLoading: boolean;
  isSaving: boolean;
  SaveButton: ({ onSuccess }: { onSuccess?: () => void }) => ReactNode;
  hasMedia?: boolean;
}

const MediaInner = ({ metadata, isOwner, isLoading, isSaving, SaveButton }: MediaProps) => {
  const [editActive, setEditActive] = useState(false);

  useMediaInitialization(metadata ?? undefined);

  if (isLoading) {
    return <MediaSkeleton />;
  }

  return (
    <Fragment>
      <div className="w-full font-archivo">
        <div className="mt-4 max-w-md rounded-lg bg-white p-4 md:p-6 shadow-sm">
          <div className="space-y-4">
            <TitleInput disabled={!isOwner || isSaving} labelHidden={false} />
            <DescriptionInput disabled={!isOwner || isSaving} labelHidden={false} />
            <div className="relative aspect-[571/692] bg-[url('/grid.svg')] bg-contain">
              {editActive || !metadata ? (
                <AnimationUpload isOwner={isOwner} isSaving={isSaving} />
              ) : (
                <>
                  <ContentRenderer metadata={metadata} />
                  {!editActive && <ResetButton onReset={() => setEditActive(true)} />}
                </>
              )}
            </div>
            <SaveButton
              onSuccess={() => {
                setEditActive(false);
              }}
            />
            <OwnerWarning isOwner={isOwner} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MediaInner;
