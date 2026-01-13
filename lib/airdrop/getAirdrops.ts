import { z } from "zod";
import { getAirdropsSchema } from "../schema/getAirdropsSchema";
import selectAirdrops from "../supabase/in_process_airdrops/selectAirdrops";

export type GetAirdropsInput = z.infer<typeof getAirdropsSchema>;

export async function getAirdrops({ artist_address, chainId, offset }: GetAirdropsInput) {
  const airdrops = await selectAirdrops({
    artist_address,
    chainId,
    offset,
  });

  const formattedAirdrops =
    airdrops?.map((airdrop) => ({
      collectionAddress: airdrop.moment.collection.address,
      tokenId: airdrop.moment.token_id.toString(),
      recipient: {
        address: airdrop.recipient.address,
        username: airdrop.recipient.username || null,
      },
      amount: Number(airdrop.amount),
    })) || [];

  return formattedAirdrops;
}
