"use client";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import useSmartWalletCollectionPermission from "@/hooks/useSmartWalletCollectionPermission";

interface SaveCollectionButtonProps {
  onSuccess?: () => void;
}

const SaveCollectionButton = ({ onSuccess }: SaveCollectionButtonProps) => {
  const isOwner = useIsCollectionOwner();
  const { hasNotPermission } = useSmartWalletCollectionPermission();
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
    <div>
      {hasNotPermission && (
        <p className="mb-4 text-sm text-amber-600">
          The In Process smart wallet does not have permission to edit legacy moments. Please sign a
          transaction with your external wallet to grant the smart wallet permission to edit this
          collection.
        </p>
      )}
      <button
        className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
        onClick={handleSave}
        disabled={isSaving || !isOwner || !isFormValid || hasNotPermission}
      >
        {isSaving ? "saving..." : "Save"}
      </button>
    </div>
  );
};

export default SaveCollectionButton;
