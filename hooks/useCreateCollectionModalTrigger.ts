import { useState, useCallback } from "react";

export const useCreateCollectionModalTrigger = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  return {
    isCreateModalOpen,
    setIsCreateModalOpen,
    openModal,
    closeModal,
  };
};
