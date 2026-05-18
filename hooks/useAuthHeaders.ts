import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthHeaders = () => {
  const { getAccessToken } = usePrivy();
  const { isMiniApp, miniAppReady } = useMiniAppProvider();

  return useCallback(async (): Promise<HeadersInit> => {
    if (!miniAppReady) throw new Error("auth context not ready");
    if (isMiniApp) {
      const token = await getFarcasterToken();
      return { Authorization: `Farcaster ${token}` };
    }
    const token = await getAccessToken();
    if (!token) throw new Error("Privy access token unavailable");
    return { Authorization: `Bearer ${token}` };
  }, [miniAppReady, isMiniApp, getAccessToken]);
};

export default useAuthHeaders;
