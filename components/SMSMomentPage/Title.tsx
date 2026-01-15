"use client";

import { Input } from "../ui/input";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";

const Title = () => {
  const { isOwner, metadata } = useMomentProvider();
  const { form } = useMetadataFormProvider();
  const { isLoading: isUpdating } = useMomentUriUpdateProvider();

  if (isOwner) {
    return (
      <div className="w-full">
        <Input
          type="text"
          {...form.register("name")}
          placeholder="enter a title"
          className="font-spectral !text-md"
          disabled={isUpdating}
        />
        {form.formState.errors.name && (
          <p className="mt-1 font-archivo text-xs text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
    );
  }

  return <h3 className="font-spectral text-xl">{metadata?.name || ""}</h3>;
};

export default Title;
