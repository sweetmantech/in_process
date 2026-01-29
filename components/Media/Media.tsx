"use client";

import { Fragment, useState, ReactNode } from "react";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import ContentRenderer from "@/components/Renderers";
import ResetButton from "../MetadataCreation/ResetButton";
import AnimationUpload from "./AnimationUpload";
import { Skeleton } from "../ui/skeleton";
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

export const Media = ({ metadata, isOwner, isLoading, isSaving, SaveButton }: MediaProps) => {
  const [editActive, setEditActive] = useState(false);

  useMediaInitialization(metadata ?? undefined);

  if (isLoading || !metadata) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  return (
    <Fragment>
      <div className="w-full font-archivo">
        <div className="mt-4 max-w-md rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <TitleInput disabled={!isOwner || isSaving} labelHidden={false} />
            <DescriptionInput disabled={!isOwner || isSaving} labelHidden={false} />
            <div className="md:min-h-auto relative min-h-[400px] bg-[url('/grid.svg')] bg-contain md:aspect-[571/692]">
              {editActive ? (
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
