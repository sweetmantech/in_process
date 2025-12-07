import { RefObject, useCallback } from "react";

export const useOpenFileDialog = (
  fileInputRef: RefObject<HTMLInputElement | null>,
  isOwner: boolean,
  isSaving: boolean
) => {
  const openFileDialog = useCallback(() => {
    if (isOwner && !isSaving) {
      fileInputRef.current?.click();
    }
  }, [fileInputRef, isOwner, isSaving]);

  return { openFileDialog };
};
