import { z } from "zod";
import addressSchema from "./addressSchema";

export const getSmartWalletBalancesSchema = z.object({
  artist_address: addressSchema,
  chainId: z.coerce.number().optional().default(8453),
});
