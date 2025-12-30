import { useState } from "react";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { disconnectPhone } from "@/lib/phones/disconnectPhone";
import { useUserProvider } from "@/providers/UserProvider";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { PHONE_VERIFICATION_STATUS } from "@/types/phone";

const useDisconnectPhone = () => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { getAccessToken } = usePrivy();
  const { profile } = useUserProvider();
  const { refetch } = profile;
  const { setStatus } = usePhoneVerificationProvider();

  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true);

      // Get access token
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      // Call API to disconnect phone
      await disconnectPhone(accessToken);

      // Refetch profile to update phone status
      await refetch();

      // Update phone verification status
      setStatus(PHONE_VERIFICATION_STATUS.READY_TO_VERIFY);

      toast.success("Phone number disconnected successfully");
    } catch (error: any) {
      console.error("Error disconnecting phone:", error);
      toast.error(error?.message || "Failed to disconnect phone number");
    } finally {
      setIsDisconnecting(false);
    }
  };

  return {
    handleDisconnect,
    isDisconnecting,
  };
};

export default useDisconnectPhone;
