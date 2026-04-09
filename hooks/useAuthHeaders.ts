import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useFrameProvider } from "@/providers/FrameProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthHeaders = () => {
  const { getAccessToken } = usePrivy();
  const { context, frameReady } = useFrameProvider();
  // Only treat as Farcaster once the frame SDK has finished loading;
  // before that, context is undefined in both Farcaster and non-Farcaster environments.
  const isFarcasterMiniApp = frameReady && Boolean(context);

  return useCallback(async (): Promise<HeadersInit> => {
    if (isFarcasterMiniApp) {
      const token = await getFarcasterToken();
      return { Authorization: `Farcaster ${token}` };
    }
    const token = await getAccessToken();
    if (!token) throw new Error("Privy access token unavailable");
    return { Authorization: `Bearer ${token}` };
  }, [isFarcasterMiniApp, getAccessToken]);
};

export default useAuthHeaders;
