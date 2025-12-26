import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { isAddress, getAddress } from "viem";
import { addMomentAdmin } from "@/lib/moment/addMomentAdmin";
import resolveEnsToAddress from "@/lib/ens/resolveEnsToAddress";

const useAddMomentAdmin = () => {
  const { momentAdmins, moment, fetchMomentData } = useMomentProvider();
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { getAccessToken } = usePrivy();

  const handleAddAdmin = async () => {
    try {
      if (!newAdminAddress.trim()) {
        toast.error("Please enter an admin address or ENS name");
        return;
      }

      setIsAdding(true);

      let resolvedAddress: string;

      // Check if input is already an address
      if (isAddress(newAdminAddress)) {
        resolvedAddress = getAddress(newAdminAddress);
      } else {
        // Try to resolve as ENS name
        const ensAddress = await resolveEnsToAddress(newAdminAddress);

        if (!ensAddress) {
          toast.error("Invalid address or ENS name could not be resolved");
          setIsAdding(false);
          return;
        }

        resolvedAddress = getAddress(ensAddress);
      }

      const normalizedAddress = getAddress(resolvedAddress);

      // Check if address is already an admin
      if (momentAdmins?.some((admin: string) => getAddress(admin) === normalizedAddress)) {
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

      // Call API to add admin
      await addMomentAdmin({
        moment,
        adminAddress: normalizedAddress,
        accessToken,
      });

      // Refresh moment data to get updated admins list
      await fetchMomentData();

      toast.success(
        "Admin added successfully. It will appear in the list after the transaction is confirmed."
      );
      setNewAdminAddress("");
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast.error(error?.message || "Failed to add admin");
    } finally {
      setIsAdding(false);
    }
  };

  return {
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    isAdding,
  };
};

export default useAddMomentAdmin;
