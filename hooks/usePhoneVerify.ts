import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { verifyPhoneNumber } from "@/lib/phones/verifyPhoneNumber";
import { useUserProvider } from "@/providers/UserProvider";
import { PHONE_VERIFICATION_STATUS } from "@/types/phone";
import { normalizeUsPhoneNumber } from "@/lib/phones/normalizeUsPhoneNumber";

export const usePhoneVerify = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { profile } = useUserProvider();
  const { refetch } = profile;
  const [status, setStatus] = useState<PHONE_VERIFICATION_STATUS>(
    PHONE_VERIFICATION_STATUS.READY_TO_VERIFY
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (status === PHONE_VERIFICATION_STATUS.CONFIRMING) {
      interval = setInterval(() => {
        refetch();
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status]);

  useEffect(() => {
    if (profile) {
      if (profile.phoneVerified) {
        setStatus(PHONE_VERIFICATION_STATUS.VERIFIED);
        setTimeout(() => {
          setIsDialogOpen(false);
        }, 1000);
      }
    }
  }, [profile]);

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

      // Normalize phone number to E.164 format (assumes USA if no country code)
      const normalizedPhoneNumber = normalizeUsPhoneNumber(phoneNumber.trim());

      await verifyPhoneNumber(normalizedPhoneNumber, accessToken);
      toast.success(
        "A verification message has been sent to your phone. Please check your messages."
      );
      setPhoneNumber("");
      setStatus(PHONE_VERIFICATION_STATUS.CONFIRMING);
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
    isDialogOpen,
    setIsDialogOpen,
    status,
    setStatus,
  };
};
