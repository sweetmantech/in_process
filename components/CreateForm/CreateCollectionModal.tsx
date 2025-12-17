"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionProvider } from "@/providers/CollectionCreateProvider/CreateCollectionProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import Image from "next/image";
import CreateCollectionButton from "./CreateCollectionButton";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";

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
          <div className="flex grid grid-cols-2 items-start gap-2">
            <fieldset className="col-span-1">
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
                <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden rounded border border-grey">
                  <Image
                    src={imagePreview}
                    alt="Collection preview"
                    fill
                    className="object-cover cursor-pointer"
                    onClick={handleImageClick}
                    unoptimized
                  />
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageClick}
                  className="w-full aspect-video flex-shrink-0 font-spectral border-dashed p-0"
                  disabled={isCreating}
                >
                  <span className="text-xs">Select an image</span>
                </Button>
              )}
            </fieldset>
            <fieldset className="col-span-1">
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
