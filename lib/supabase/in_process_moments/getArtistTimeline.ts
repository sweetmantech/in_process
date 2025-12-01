import { supabase } from "@/lib/supabase/client";
import type { GetArtistTimelineParams, GetArtistTimelineResponse } from "@/types/moment";

const getArtistTimeline = async ({
  artist,
  type = null,
  limit = 100,
  page = 1,
  chainId,
  hidden = false,
}: GetArtistTimelineParams): Promise<{
  data: GetArtistTimelineResponse | null;
  error: Error | null;
}> => {
  const { data, error } = await supabase.rpc("get_artist_timeline", {
    p_artist: artist,
    p_type: type ?? undefined,
    p_limit: limit,
    p_page: page,
    p_chainid: chainId,
    p_hidden: hidden,
  });

  if (error) {
    return { data: null, error };
  }

  return {
    data: data as unknown as GetArtistTimelineResponse,
    error: null,
  };
};

export default getArtistTimeline;
