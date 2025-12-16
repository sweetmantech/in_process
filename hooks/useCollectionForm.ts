import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useCollectionForm = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.includes("image")) {
        toast.error("Please select only image file");
        return;
      }

      // Revoke previous blob URL if exists
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImageFile(file);
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
    },
    [imagePreview]
  );

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetForm = useCallback(() => {
    setName("");
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
  }, [imagePreview]);

  const handleClose = useCallback(() => {
    resetForm();
    setIsCreateModalOpen(false);
  }, [resetForm, setIsCreateModalOpen]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return {
    name,
    setName,
    imageFile,
    imagePreview,
    fileInputRef,
    handleImageSelect,
    handleImageClick,
    resetForm,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleClose,
  };
};
