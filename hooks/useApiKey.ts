import { useState, useEffect } from 'react';
import { ApiKeyClient } from '@/lib/api-key/client-utils';
import useConnectedWallet from './useConnectedWallet';
import { useUserProvider } from '@/providers/UserProvider';
import { useSignMessage } from '@privy-io/react-auth';

interface ApiKeyData {
  id: string;
  apiKey: string;
  keyName: string;
  artistAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseApiKeyReturn {
  apiKey: ApiKeyData | null;
  isLoading: boolean;
  error: string | null;
  createApiKey: (keyName: string) => Promise<{ success: boolean; error?: string }>;
  updateApiKey: (keyName: string) => Promise<{ success: boolean; error?: string }>;
  refreshApiKey: () => Promise<void>;
}

export default function useApiKey(): UseApiKeyReturn {
  const [apiKey, setApiKey] = useState<ApiKeyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { artistWallet, connectedAddress } = useUserProvider();
  const { signMessage } = useSignMessage();
  const address = artistWallet || connectedAddress

  // Check if user has existing API key
  const checkExistingApiKey = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get existing API key using wallet signature
      const message = ApiKeyClient.getSignMessage(address);
      const { signature } = await signMessage(
        { message },
        { address }
      );
      
      // Fetch existing API key using wallet signature
      const result = await ApiKeyClient.getApiKeyWithWallet(address, signature);
      
      if (result.success && result.apiKey) {
        setApiKey(result.apiKey);
      } else {
        // No existing API key found
        setApiKey(null);
      }
    } catch (error: any) {
      console.log('No existing API key found:', error.message);
      setApiKey(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new API key
  const createApiKey = async (keyName: string): Promise<{ success: boolean; error?: string }> => {
    if (!address) {
      return { success: false, error: 'No wallet connected' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const message = ApiKeyClient.getSignMessage(address);
      const { signature } = await signMessage(
        { message },
        { address }
      );
      
      const result = await ApiKeyClient.createInitialApiKey(
        address,
        signature,
        keyName
      );

      if (result.success && result.apiKey) {
        setApiKey(result.apiKey);
        return { success: true };
      } else {
        setError(result.error || 'Failed to create API key');
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create API key';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing API key
  const updateApiKey = async (keyName: string): Promise<{ success: boolean; error?: string }> => {
    if (!apiKey?.apiKey) {
      return { success: false, error: 'No API key available for update' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await ApiKeyClient.updateApiKey(apiKey.apiKey, keyName);

      if (result.success && result.apiKey) {
        setApiKey(result.apiKey);
        return { success: true };
      } else {
        setError(result.error || 'Failed to update API key');
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update API key';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh API key data
  const refreshApiKey = async () => {
    await checkExistingApiKey();
  };

  // Check for existing API key when wallet connects
  useEffect(() => {
    if (address) {
      checkExistingApiKey();
    } else {
      setApiKey(null);
      setError(null);
    }
  }, [address]);

  return {
    apiKey,
    isLoading,
    error,
    createApiKey,
    updateApiKey,
    refreshApiKey,
  };
}
