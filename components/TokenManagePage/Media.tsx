"use client";

import { Fragment, useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";
import OwnerWarning from "./OwnerWarning";
import SaveMediaButton from "./SaveMediaButton";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import AnimationUpload from "./AnimationUpload";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import ContentRenderer from "@/components/Renderers";
import ResetButton from "../MetadataCreation/ResetButton";

const Media = () => {
  const { metadata, isOwner, isLoading } = useMomentProvider();
  const { form, hasMedia } = useMomentFormProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();
  const [editActive, setEditActive] = useState(false);

  useMediaInitialization(metadata);

  if (isLoading || !metadata) {
    return <MediaSkeleton />;
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
                <AnimationUpload />
              ) : (
                <>
                  <ContentRenderer metadata={metadata} />
                  <ResetButton onReset={() => setEditActive(true)} />
                </>
              )}
            </div>
            {hasMedia && editActive && (
              <>
                <SaveMediaButton onSuccess={() => setEditActive(false)} />
                <OwnerWarning />
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Media;
