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
          <div className="flex flex-col gap-2">
            <Label htmlFor="collection-name" className="font-archivo pl-2">
              Name
            </Label>
            <Input
              id="collection-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              className="font-spectral"
              disabled={isCreating}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-archivo pl-2">Image</Label>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={selectFile}
                className="hidden"
                disabled={isCreating}
              />
              {imagePreview ? (
                <div className="relative w-full aspect-square overflow-hidden rounded border border-grey">
                  <Image
                    src={imagePreview}
                    alt="Collection preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageClick}
                    className="absolute bottom-2 right-2 font-spectral bg-grey-moss-100"
                    disabled={isCreating}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageClick}
                  className="w-full h-32 font-spectral border-dashed"
                  disabled={isCreating}
                >
                  Click to upload image
                </Button>
              )}
            </div>
          </div>
          <CreateCollectionButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionModal;
