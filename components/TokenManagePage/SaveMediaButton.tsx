"use client";
import { useMomentProvider } from "@/providers/MomentProvider";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

interface SaveMediaButtonProps {
  onSuccess?: () => void;
}

const SaveMediaButton = ({ onSuccess }: SaveMediaButtonProps) => {
  const { isOwner } = useMomentProvider();
  const { updateTokenURI, isLoading: isSaving } = useUpdateMomentURI();
  const { form } = useMomentFormProvider();
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
      await updateTokenURI();
      onSuccess?.();
      toast.info("Successfully saved media. Metadata update will show up after a few seconds...");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save media");
    }
  };

  // Watch name value reactively
  const nameValue = form.watch("name");
  const nameError = errors.name;
  const hasValidName = nameValue && typeof nameValue === "string" && nameValue.trim().length > 0;
  const isFormValid = hasValidName && !nameError;

  return (
    <button
      className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md disabled:opacity-50"
      onClick={handleSave}
      disabled={isSaving || !isOwner || !isFormValid}
    >
      {isSaving ? "saving..." : "Save"}
    </button>
  );
};

export default SaveMediaButton;
