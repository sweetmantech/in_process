import { z } from "zod";
import { getAirdropSchema } from "../schema/getAirdropSchema";
import selectAirdrops from "../supabase/in_process_airdrops/selectAirdrops";

export type GetAirdropsInput = z.infer<typeof getAirdropSchema>;

export async function getAirdrops({ artist_address, offset }: GetAirdropsInput) {
  const airdrops = await selectAirdrops({
    artist_address,
    offset,
  });

  const formattedAirdrops =
    airdrops?.map((airdrop) => ({
      collectionAddress: airdrop.moment.collection.address,
      tokenId: airdrop.moment.token_id,
      recipient: {
        address: airdrop.recipient.address,
        username: airdrop.recipient.username || null,
      },
      amount: Number(airdrop.amount),
    })) || [];

  return formattedAirdrops;
}
