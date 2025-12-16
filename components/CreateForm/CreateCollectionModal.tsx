"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCollectionCreate } from "@/hooks/useCollectionCreate";
import { useCollectionFormProvider } from "@/providers/CollectionFormProvider";
import Image from "next/image";

const CreateCollectionModal = () => {
  const {
    name,
    setName,
    imageFile,
    imagePreview,
    fileInputRef,
    handleImageSelect,
    handleImageClick,
    isCreateModalOpen,
    handleClose,
  } = useCollectionFormProvider();

  const { handleSubmit, isCreating, uploadProgress } = useCollectionCreate();

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
                onChange={handleImageSelect}
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
                onClick={() => handleClose()}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionModal;
