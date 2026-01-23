import { z } from "zod";
import addressSchema from "./addressSchema";

export const getSmartWalletBalancesSchema = z.object({
  artist_address: addressSchema,
  chainId: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.coerce.number().optional().default(8453)
  ),
});
