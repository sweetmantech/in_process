import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { getAddress, Address } from "viem";
import { removeMomentAdmin } from "@/lib/moment/removeMomentAdmin";

const useRemoveCollectionAdmin = () => {
  const { data } = useCollectionProvider();
  const [isRemoving, setIsRemoving] = useState(false);
  const { getAccessToken } = usePrivy();

  const handleRemoveAdmin = async (adminAddress: Address) => {
    try {
      if (!data) {
        toast.error("Collection data not available");
        return;
      }

      setIsRemoving(true);

      const normalizedAddress = getAddress(adminAddress);

      // Get access token
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      // Call API to remove admin using moment with tokenId "0" for collection-level permissions
      await removeMomentAdmin({
        moment: {
          collectionAddress: data.address as `0x${string}`,
          tokenId: "0",
          chainId: data.chain_id,
        },
        adminAddress: normalizedAddress,
        accessToken,
      });

      toast.success("Admin removed successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        const msg = typeof error === "string" ? error : JSON.stringify(error);
        toast.error(msg || "Failed to remove admin");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return {
    handleRemoveAdmin,
    isRemoving,
  };
};

export default useRemoveCollectionAdmin;
