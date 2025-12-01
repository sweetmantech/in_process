import { supabase } from "@/lib/supabase/client";

export interface GetInProcessTimelineParams {
  limit?: number;
  page?: number;
  chainId?: number;
  hidden?: boolean;
}

export interface GetInProcessTimelineResponse {
  moments: Array<{
    address: string;
    token_id: string;
    max_supply: number;
    chain_id: number;
    id: string;
    uri: string;
    default_admin: {
      address: string;
      username: string | null;
      hidden: boolean;
    };
    admins: Array<{
      address: string;
      username: string | null;
      hidden: boolean;
    }>;
    created_at: string;
    updated_at: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
}

const getInProcessTimeline = async ({
  limit = 100,
  page = 1,
  chainId,
  hidden = false,
}: GetInProcessTimelineParams = {}): Promise<{
  data: GetInProcessTimelineResponse | null;
  error: Error | null;
}> => {
  const { data, error } = await (supabase.rpc as any)("get_in_process_timeline", {
    p_limit: limit,
    p_page: page,
    p_chainid: chainId,
    p_hidden: hidden,
  });

  if (error) {
    return { data: null, error };
  }

  return {
    data: data as unknown as GetInProcessTimelineResponse,
    error: null,
  };
};

export default getInProcessTimeline;
