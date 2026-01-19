import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { getAddress } from "viem";
import { addMomentAdmin } from "@/lib/moment/addMomentAdmin";
import { resolveAddressOrEns } from "@/lib/ens/resolveAddressOrEns";

const useAddCollectionAdmin = () => {
  const { data } = useCollectionProvider();
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { getAccessToken } = usePrivy();

  const handleAddAdmin = async () => {
    try {
      if (!newAdminAddress.trim()) {
        toast.error("Please enter an admin address or ENS name");
        return;
      }

      if (!data) {
        toast.error("Collection data not available");
        return;
      }

      setIsAdding(true);

      // Resolve address or ENS name
      const normalizedAddress = await resolveAddressOrEns(newAdminAddress);

      // Check if address is already an admin
      if (data.admins?.some((admin: string) => getAddress(admin) === normalizedAddress)) {
        toast.error("This address is already an admin.");
        setNewAdminAddress("");
        setIsAdding(false);
        return;
      }

      // Get access token
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      // Call API to add admin using moment with tokenId "0" for collection-level permissions
      await addMomentAdmin({
        moment: {
          collectionAddress: data.address as `0x${string}`,
          tokenId: "0",
          chainId: data.chain_id,
        },
        adminAddress: normalizedAddress,
        accessToken,
      });

      toast.success("Admin added successfully.");
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast.error(error?.message || "Failed to add admin");
    } finally {
      setIsAdding(false);
      setNewAdminAddress("");
    }
  };

  return {
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    isAdding,
  };
};

export default useAddCollectionAdmin;
