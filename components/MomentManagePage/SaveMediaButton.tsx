"use client";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import { useCollectionChangeWarning } from "@/hooks/useCollectionChangeWarning";
import Warning from "./Warning";
import GrantMomentPermissionButton from "./GrantMomentPermissionButton";
import CollectionChangeWarningModal from "./CollectionChangeWarningModal";

interface SaveMediaButtonProps {
  onSuccess?: () => void;
}

const SaveMediaButton = ({ onSuccess }: SaveMediaButtonProps) => {
  const { isOwner } = useMomentProvider();
  const { form } = useMetadataFormProvider();
  const { errors } = useFormState({ control: form.control });
  const hasWarning = useMomentLegacyWarning();

  const { open, isSaving, isCollectionChanged, save, openWarning, handleConfirm, handleCancel } =
    useCollectionChangeWarning(onSuccess);

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

    if (isCollectionChanged) {
      openWarning();
      return;
    }

    await save();
  };

  // Watch name value reactively
  const nameValue = form.watch("name");
  const nameError = errors.name;
  const hasValidName = nameValue && typeof nameValue === "string" && nameValue.trim().length > 0;
  const isFormValid = hasValidName && !nameError;

  return (
    <div>
      <Warning />
      {hasWarning ? (
        <GrantMomentPermissionButton />
      ) : (
        <button
          className="w-fit rounded-md bg-black px-4 md:px-8 md:py-2 py-1 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving || !isOwner || !isFormValid}
        >
          {isSaving ? "saving..." : "Save"}
        </button>
      )}
      <CollectionChangeWarningModal open={open} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
};

export default SaveMediaButton;
