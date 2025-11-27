"use client";

import { Fragment } from "react";
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

const Media = () => {
  const { metadata, isOwner, isLoading } = useMomentProvider();
  const { form } = useMomentFormProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();

  useMediaInitialization(metadata);

  if (isLoading || !metadata) {
    return <MediaSkeleton />;
  }

  return (
    <Fragment>
      <div className="w-full font-archivo">
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

            <AnimationUpload />

            <SaveMediaButton />
            <OwnerWarning />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Media;
