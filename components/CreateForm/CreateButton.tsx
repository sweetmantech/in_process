"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { toast } from "sonner";

const CreateButton = () => {
  const {
    create,
    name,
    previewUri,
    creating,
    link,
    animationUri,
    writingText,
    embedCode,
    imageUri,
  } = useZoraCreateProvider();

  const canCreate = Boolean(
    !creating &&
      name &&
      (previewUri || writingText) &&
      Boolean(animationUri || link || embedCode || imageUri || writingText)
  );

  const toastCreateError = () => {
    if (!previewUri && !writingText) {
      toast.error("Missing a preview image");
    } else if (!animationUri && !link && !embedCode && !imageUri) {
      toast.error("Missing media");
    } else {
      toast.error("Error creating");
    }
  };

  const handleCreate = async () => {
    try {
      if (!canCreate) {
        toastCreateError();
        return;
      }
      await create();
    } catch (error) {
      console.error("Error creating:", error);
    }
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
