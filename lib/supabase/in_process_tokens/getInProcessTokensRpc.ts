import { supabase } from "@/lib/supabase/client";
import type { GetInProcessMomentsRpcParams, GetInProcessMomentsRpcResponse } from "@/types/moment";

export async function getInProcessTokensRpc({
  artist,
  limit = 20,
  page = 1,
  latest = true,
  chainId,
  hidden = false,
  mutual = false,
}: GetInProcessMomentsRpcParams): Promise<{
  data: GetInProcessMomentsRpcResponse | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.rpc("get_in_process_tokens", {
    p_artist: artist?.toLowerCase(),
    p_limit: limit,
    p_page: page,
    p_latest: latest,
    p_chainid: chainId,
    p_hidden: hidden,
    p_mutual: mutual,
  });

  if (error) {
    return { data: null, error };
  }

  return {
    data: data as unknown as GetInProcessMomentsRpcResponse,
    error: null,
  };
}
