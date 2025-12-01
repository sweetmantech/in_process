import { supabase } from "@/lib/supabase/client";
import type { GetInProcessTimelineParams, GetInProcessTimelineResponse } from "@/types/moment";

const getInProcessTimeline = async ({
  limit = 100,
  page = 1,
  chainId,
  hidden = false,
}: GetInProcessTimelineParams = {}): Promise<{
  data: GetInProcessTimelineResponse | null;
  error: Error | null;
}> => {
  const { data, error } = await supabase.rpc("get_in_process_timeline", {
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
