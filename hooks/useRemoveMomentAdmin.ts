import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { getAddress, Address } from "viem";
import { removeMomentAdmin } from "@/lib/moment/removeMomentAdmin";

const useRemoveMomentAdmin = () => {
  const { moment } = useMomentProvider();
  const [isRemoving, setIsRemoving] = useState(false);
  const { getAccessToken } = usePrivy();

  const handleRemoveAdmin = async (adminAddress: Address) => {
    try {
      setIsRemoving(true);

      const normalizedAddress = getAddress(adminAddress);

      // Get access token
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      // Call API to remove admin
      await removeMomentAdmin({
        moment,
        adminAddress: normalizedAddress,
        accessToken,
      });

      toast.success(
        "Admin removed successfully. It will disappear from the list after the transaction is confirmed."
      );
    } catch (error: any) {
      console.error("Error removing admin:", error);
      toast.error(error?.message || "Failed to remove admin");
    } finally {
      setIsRemoving(false);
    }
  };

  return {
    handleRemoveAdmin,
    isRemoving,
  };
};

export default useRemoveMomentAdmin;
