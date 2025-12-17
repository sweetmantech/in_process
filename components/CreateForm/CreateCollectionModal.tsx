"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CollectionImage from "@/components/CollectionImage";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionProvider } from "@/providers/CollectionCreateProvider/CreateCollectionProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import CreateCollectionButton from "./CreateCollectionButton";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { UploadIcon } from "lucide-react";

const CreateCollectionModal = () => {
  const { name, setName, fileInputRef, blobUrls, resetForm } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();

  const { isCreating } = useCreateCollectionProvider();
  const { isCreateModalOpen, closeModal } = useCreateCollectionModalTriggerProvider();

  const handleImageClick = () => fileInputRef.current?.click();

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const imagePreview = blobUrls.image || "";

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-archivo">Create New Collection</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <fieldset>
              <Label htmlFor="collection-image" className="font-archivo">
                Image
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={selectFile}
                className="hidden"
                disabled={isCreating}
              />
              {imagePreview ? (
                <CollectionImage
                  src={imagePreview}
                  alt="Collection preview"
                  onClick={handleImageClick}
                />
              ) : (
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageClick}
                    className="w-10 h-10 flex-shrink-0 font-spectral border-dashed p-0"
                    disabled={isCreating}
                  >
                    <UploadIcon className="size-4" />
                  </Button>
                </div>
              )}
            </fieldset>
            <fieldset className="grow">
              <Label htmlFor="collection-name" className="font-archivo">
                Name
              </Label>
              <Input
                id="collection-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter collection name"
                className="font-spectral flex-1"
                disabled={isCreating}
              />
            </fieldset>
          </div>
          <CreateCollectionButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionModal;
