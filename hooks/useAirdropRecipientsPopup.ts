import { useState, useCallback } from "react";
import { useAirdropProvider } from "@/providers/AirdropProvider";

const useAirdropRecipientsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { airdropToItems, onChangeAddress, removeAddress } = useAirdropProvider();

  const handleRecipientClick = useCallback(
    (address: string) => {
      if (!address) return;
      // Check if recipient is already in airdropToItems
      const existingIndex = airdropToItems.findIndex(
        (item) =>
          typeof item.address === "string" &&
          item.address.length > 0 &&
          item.address.toLowerCase() === address.toLowerCase()
      );

      if (existingIndex !== -1) {
        // Remove if already added
        removeAddress(existingIndex);
      } else {
        // Add if not already added
        onChangeAddress(address);
      }
    },
    [airdropToItems, onChangeAddress, removeAddress]
  );

  const isRecipientActive = useCallback(
    (address: string): boolean => {
      if (!address) return false;
      return airdropToItems.some(
        (item) =>
          typeof item.address === "string" &&
          item.address.length > 0 &&
          item.address.toLowerCase() === address.toLowerCase()
      );
    },
    [airdropToItems]
  );

  return {
    isOpen,
    setIsOpen,
    handleRecipientClick,
    isRecipientActive,
  };
};

export default useAirdropRecipientsPopup;
