import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { verifyPhoneNumber } from "@/lib/phones/verifyPhoneNumber";

export const usePhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };

  const verify = async (): Promise<boolean> => {
    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await verifyPhoneNumber(phoneNumber.trim(), accessToken);
      toast.success("Verification message sent to your phone");
      setPhoneNumber("");
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to verify phone number");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phoneNumber,
    isLoading,
    handlePhoneNumberChange,
    verify,
  };
};
