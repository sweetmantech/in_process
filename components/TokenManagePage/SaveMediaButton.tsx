"use client";
import { useTokenProvider } from "@/providers/TokenProvider";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";

const SaveMediaButton = () => {
  const { isOwner } = useTokenProvider();
  const { updateTokenURI, isLoading: isSaving } = useUpdateMomentURI();
  const { form } = useMomentManageProvider();
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

    await updateTokenURI();
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
