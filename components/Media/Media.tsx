"use client";

import { Fragment, useState, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import ContentRenderer from "@/components/Renderers";
import ResetButton from "../MetadataCreation/ResetButton";
import { MomentMetadata } from "@/types/moment";
import AnimationUpload from "./AnimationUpload";
import { Skeleton } from "../ui/skeleton";
import OwnerWarning from "./OwnerWarning";

interface MediaProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isLoading: boolean;
  isSaving: boolean;
  SaveButton: ({ onSuccess }: { onSuccess?: () => void }) => ReactNode;
  hasMedia?: boolean;
}

export const Media = ({ metadata, isOwner, isLoading, isSaving, SaveButton }: MediaProps) => {
  const { form, hasMedia } = useMetadataFormProvider();
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
            <div>
              <label className="text-grey-moss-600 mb-1 block font-archivo text-sm">title</label>
              <Input
                type="text"
                {...form.register("name")}
                placeholder="enter a title"
                disabled={!isOwner || isSaving}
              />
              {form.formState.errors.name && (
                <p className="mt-1 font-archivo text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-grey-moss-600 mb-1 block font-archivo text-sm">
                description
              </label>
              <Textarea
                {...form.register("description")}
                className="focus:border-grey-moss-500 font-archivo"
                minRows={3}
                placeholder="enter a description"
                disabled={!isOwner || isSaving}
              />
              {form.formState.errors.description && (
                <p className="mt-1 font-archivo text-xs text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

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
            {editActive && (hasMedia ?? true) && (
              <>
                <SaveButton onSuccess={() => setEditActive(false)} />
                <OwnerWarning isOwner={isOwner} />
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
