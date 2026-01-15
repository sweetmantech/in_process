"use client";

import { Textarea } from "../ui/textarea";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import Description from "../MomentPage/Description";

const DescriptionEditor = () => {
  const { isOwner, metadata } = useMomentProvider();
  const { form } = useMetadataFormProvider();
  const { isLoading: isUpdating } = useMomentUriUpdateProvider();

  if (isOwner) {
    return (
      <div className="mt-3 md:mt-4">
        <Textarea
          {...form.register("description")}
          className="focus:border-grey-moss-500 !font-spectral !text-md"
          minRows={3}
          placeholder="enter a description"
          disabled={isUpdating}
        />
        {form.formState.errors.description && (
          <p className="mt-1 font-archivo text-xs text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>
    );
  }

  return <Description description={metadata?.description || ""} />;
};

export default DescriptionEditor;
