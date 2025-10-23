import { useState, useEffect } from "react";
import { ApiKeyClient } from "@/lib/api-key/client-utils";
import { useUserProvider } from "@/providers/UserProvider";
import { useSignMessage } from "@privy-io/react-auth";

interface ApiKeyData {
  id: string;
  keyName: string;
  artistAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseApiKeyReturn {
  isLoading: boolean;
  error: string | null;
  createApiKey: (keyName: string) => Promise<{ success: boolean; error?: string }>;
}

export default function useApiKey(): UseApiKeyReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { artistWallet, connectedAddress } = useUserProvider();
  const { signMessage } = useSignMessage();
  const address = artistWallet || connectedAddress;

  // Create new API key
  const createApiKey = async (keyName: string): Promise<{ success: boolean; error?: string }> => {
    if (!address) {
      return { success: false, error: "No wallet connected" };
    }

    setIsLoading(true);
    setError(null);

    try {
      const message = ApiKeyClient.getSignMessage(address);
      const { signature } = await signMessage({ message }, { address });

      console.log("signature", signature);
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create API key";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createApiKey,
  };
}
