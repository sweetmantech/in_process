import { supabase } from "@/lib/supabase/client";

export interface GetArtistDefaultTimelineParams {
  artist: string;
  limit?: number;
  page?: number;
  chainId?: number;
  hidden?: boolean;
}

export interface GetArtistDefaultTimelineResponse {
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

const getArtistDefaultTimeline = async ({
  artist,
  limit = 100,
  page = 1,
  chainId,
  hidden = false,
}: GetArtistDefaultTimelineParams): Promise<{
  data: GetArtistDefaultTimelineResponse | null;
  error: Error | null;
}> => {
  const { data, error } = await (supabase.rpc as any)("get_artist_default_timeline", {
    p_artist: artist,
    p_limit: limit,
    p_page: page,
    p_chainid: chainId,
    p_hidden: hidden,
  });

  if (error) {
    return { data: null, error };
  }

  return {
    data: data as unknown as GetArtistDefaultTimelineResponse,
    error: null,
  };
};

export default getArtistDefaultTimeline;
