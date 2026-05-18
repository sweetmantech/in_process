import { useState } from "react";
import { toast } from "sonner";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";

export const useCollectionChangeWarning = (onSuccess?: () => void) => {
  const { moment } = useMomentProvider();
  const { updateTokenURI, isLoading: isSaving } = useMomentUriUpdateProvider();
  const { selectedCollection, setSelectedCollection } = useCollectionsProvider();
  const [open, setOpen] = useState(false);

  const isCollectionChanged = Boolean(
    selectedCollection && selectedCollection !== moment.collectionAddress
  );

  const save = async () => {
    try {
      await updateTokenURI();
      onSuccess?.();
      toast.info("Successfully saved media. Metadata update will show up after a few seconds...");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save media");
    }
  };

  const openWarning = () => setOpen(true);

  const handleConfirm = async () => {
    setOpen(false);
    await save();
  };

  const handleCancel = () => {
    setSelectedCollection(moment.collectionAddress);
    setOpen(false);
  };

  return {
    open,
    isSaving,
    isCollectionChanged,
    save,
    openWarning,
    handleConfirm,
    handleCancel,
  };
};
