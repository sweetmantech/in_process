"use client";

import { Button } from "@/components/ui/button";
import { useCreateCollectionProvider } from "@/providers/CollectionCreateProvider/CreateCollectionProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";

const CreateCollectionButton = () => {
  const { isCreating, uploadProgress, handleSubmit } = useCreateCollectionProvider();
  const { name, imageFile, resetFiles } = useMetadataFormProvider();
  const { closeModal } = useCreateCollectionModalTriggerProvider();

  const handleClose = () => {
    resetFiles();
    closeModal();
  };

  return (
    <div className="flex flex-col gap-2">
      {isCreating && (
        <div className="flex flex-col gap-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-grey-moss-300">
            <div
              className="h-full bg-grey-moss-900 transition-all duration-300"
              style={{ width: `${uploadProgress || 0}%` }}
            />
          </div>
          <div className="text-right font-spectral text-sm text-grey-moss-600">
            {Math.round(uploadProgress || 0)}%
          </div>
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={isCreating}
          className="font-spectral"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!name.trim() || !imageFile || isCreating}
          className="font-spectral bg-black text-grey-eggshell hover:bg-grey-moss-300"
        >
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default CreateCollectionButton;
