"use client";

import { Button } from "@/components/ui/button";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { toast } from "sonner";

const CreateButton = () => {
  const { create, creating } = useMomentCreateProvider();
  const { link, embedCode, writingText, animationFile, imageFile, previewFile, form } =
    useMomentFormProvider();

  const hasMedia = Boolean(link || embedCode || imageFile || animationFile || writingText);
  const hasPreview = Boolean(previewFile || writingText);

  const toastCreateError = () => {
    const formIsValid = form.formState.isValid;
    if (!formIsValid) {
      const errors = form.formState.errors;
      if (errors.name) {
        toast.error(errors.name.message || "Title is required");
      } else if (errors.price) {
        toast.error(errors.price.message || "Price is required");
      } else if (errors.splits) {
        toast.error(errors.splits.message || "Splits validation failed");
      } else {
        toast.error("Please fix form errors");
      }
    } else if (!hasPreview) {
      toast.error("Missing a preview image");
    } else if (!hasMedia) {
      toast.error("Missing media");
    } else {
      toast.error("Error creating");
    }
  };

  const handleCreate = async () => {
    const isValid = await form.trigger();
    const canCreate = Boolean(!creating && isValid && hasPreview && hasMedia);

    if (!canCreate) {
      toastCreateError();
      return;
    }
    await create();
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={creating}
      className="self-center w-fit z-10 px-14 py-5 md:py-6 md:w-full md:!mt-4 !font-archivo bg-black hover:bg-grey-moss-300 text-grey-eggshell md:h-[60px] !text-xl !rounded-sm transform transition-transform duration-150 disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
    >
      {creating ? "creating..." : "create"}
    </Button>
  );
};

export default CreateButton;
