import { useUserProvider } from "@/providers/UserProvider";

export const useCollectionsDropdown = (setOpen: (open: boolean) => void) => {
  const { isPrepared } = useUserProvider();

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isPrepared()) {
      return;
    }
    setOpen(newOpen);
  };

  return { handleOpenChange };
};
