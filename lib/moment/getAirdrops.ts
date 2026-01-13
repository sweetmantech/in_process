import { z } from "zod";
import { getAirdropSchema } from "../schema/getAirdropSchema";
import selectMoments from "../supabase/in_process_moments/selectMoments";
import selectAirdrops from "../supabase/in_process_airdrops/selectAirdrops";

export type GetAirdropsInput = z.infer<typeof getAirdropSchema>;

export async function getAirdrops({ moment, offset }: GetAirdropsInput) {
  const data = await selectMoments(moment);

  const momentData = data[0];

  if (!momentData) {
    throw new Error("Moment not found");
  }

  const airdrops = await selectAirdrops({
    momentId: momentData.id,
    offset,
  });

  const formattedAirdrops =
    airdrops?.map((airdrop) => ({
      recipient: {
        address: airdrop.recipient.address,
        username: airdrop.recipient.username || null,
      },
      amount: Number(airdrop.amount),
    })) || [];

  return formattedAirdrops;
}
