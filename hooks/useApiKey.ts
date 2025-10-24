import { useState, useEffect } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { toast } from "sonner";
import { createApiKey } from "@/lib/api-keys/createApiKey";
import { fetchApiKeys } from "@/lib/api-keys/fetchApiKeys";
import { deleteApiKey } from "@/lib/api-keys/deleteApiKey";
import { usePrivy } from "@privy-io/react-auth";

interface UseApiKeyReturn {
  createApiKey: (keyName: string) => Promise<void>;
  apiKey: string | null;
  showApiKeyModal: boolean;
  setShowApiKeyModal: (show: boolean) => void;
  apiKeys: any[];
  loadingKeys: boolean;
  loadApiKeys: () => Promise<void>;
  deleteApiKey: (keyId: string) => Promise<void>;
}

export default function useApiKey(): UseApiKeyReturn {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const { getAccessToken } = usePrivy();
  const { artistWallet } = useUserProvider();

  const createApiKeyHandler = async (keyName: string): Promise<void> => {
    if (apiKeys.length >= 5) {
      toast.error("Maximum 5 API keys allowed per artist. Please delete an existing key first.");
      return;
    }

    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        const key = await createApiKey(keyName, accessToken);
        setApiKey(key);
        setShowApiKeyModal(true);
        await loadApiKeys();
        return;
      }
      toast.error("No access token found");
    } catch (error: any) {
      toast.error(error.message || "Failed to create API key");
    }
  };

  const loadApiKeys = async (): Promise<void> => {
    setLoadingKeys(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast.error("No access token found");
        return;
      }

      const keys = await fetchApiKeys(accessToken);
      setApiKeys(keys);
    } catch (error: any) {
      toast.error(error.message || "Failed to load API keys");
    } finally {
      setLoadingKeys(false);
    }
  };

  const deleteApiKeyHandler = async (keyId: string): Promise<void> => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast.error("No access token found");
        return;
      }

      await deleteApiKey(keyId, accessToken);
      toast.success("API key deleted successfully");
      await loadApiKeys();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete API key");
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, [artistWallet]);

  return {
    createApiKey: createApiKeyHandler,
    apiKey,
    showApiKeyModal,
    setShowApiKeyModal,
    apiKeys,
    loadingKeys,
    loadApiKeys,
    deleteApiKey: deleteApiKeyHandler,
  };
}
