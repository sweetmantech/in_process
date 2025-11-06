import { SetupNewContract } from "@/types/envio";
import { Database } from "../types";

/**
 * Maps moment events from GRPC to Supabase format for in_process_tokens table.
 * @param moments - Array of moment events from GRPC.
 * @returns The mapped objects for Supabase upsert.
 */
export function mapMomentsToSupabase(
  moments: SetupNewContract[]
): Database["public"]["Tables"]["in_process_tokens"]["Insert"][] {
  return moments.map((moment) => ({
    address: moment.address?.toLowerCase(),
    defaultAdmin: moment.defaultAdmin?.toLowerCase(),
    chainId: moment.chainId,
    tokenId: 0,
    uri: moment.contractURI,
    createdAt: new Date(Number(moment.blockTimestamp) * 1000).toISOString(),
  }));
}
