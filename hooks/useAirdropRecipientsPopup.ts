import { useCallback } from "react";
import { useAirdropProvider } from "@/providers/AirdropProvider";

const useAirdropRecipientsPopup = () => {
  const { airdropToItems, onChangeAddress, removeAddress } = useAirdropProvider();

  const handleRecipientClick = useCallback(
    (address: string) => {
      // Check if recipient is already in airdropToItems
      const existingIndex = airdropToItems.findIndex(
        (item) => item.address.toLowerCase() === address.toLowerCase()
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
      return airdropToItems.some((item) => item.address.toLowerCase() === address.toLowerCase());
    },
    [airdropToItems]
  );

  return {
    handleRecipientClick,
    isRecipientActive,
  };
};

export default useAirdropRecipientsPopup;
