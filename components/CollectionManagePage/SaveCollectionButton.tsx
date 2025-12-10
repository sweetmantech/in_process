"use client";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";

interface SaveCollectionButtonProps {
  onSuccess?: () => void;
}

const SaveCollectionButton = ({ onSuccess }: SaveCollectionButtonProps) => {
  const isOwner = useIsCollectionOwner();
  const { updateCollectionURI, isLoading: isSaving } = useUpdateCollectionURI();
  const { form } = useMetadataFormProvider();
  const { errors } = useFormState({ control: form.control });

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      if (errors.name) {
        toast.error(errors.name.message || "Title is required");
      } else {
        toast.error("Please fix form errors");
      }
      return;
    }

    try {
      await updateCollectionURI();
      onSuccess?.();
      toast.info(
        "Successfully saved collection. Metadata update will show up after a few seconds..."
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to save collection");
    }
  };

  // Watch name value reactively
  const nameValue = form.watch("name");
  const nameError = errors.name;
  const hasValidName = nameValue && typeof nameValue === "string" && nameValue.trim().length > 0;
  const isFormValid = hasValidName && !nameError;

  return (
    <button
      className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
      onClick={handleSave}
      disabled={isSaving || !isOwner || !isFormValid}
    >
      {isSaving ? "saving..." : "Save"}
    </button>
  );
};

export default SaveCollectionButton;
