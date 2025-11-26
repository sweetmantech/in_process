import type { Database } from "@/lib/supabase/types";

export type AggregatedRawMoment = Database["public"]["Tables"]["in_process_moments"]["Row"] & {
  collection: {
    id: string;
    address: string;
    chain_id: number;
    created_at: string;
    default_admin: Database["public"]["Tables"]["in_process_artists"]["Row"];
    admins: Array<{
      id: string;
      token_id: number;
      hidden: boolean;
      granted_at: string;
      artist: Database["public"]["Tables"]["in_process_artists"]["Row"];
    }>;
  };
};

export interface Moment {
  address: string;
  token_id: string;
  max_supply: number;
  chain_id: number;
  id: string;
  uri: string;
  admins: Array<{
    address: string;
    username: string | null;
    defaultAdmin: boolean;
    hidden: boolean;
  }>;
  created_at: string;
  updated_at: string;
}

export interface InprocessTimelineResponse {
  moments: Moment[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
}
