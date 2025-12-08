import { z } from "zod";
import { Address } from "viem";

export const updateCollectionURISchema = z.object({
  collection: z.object({
    address: z.custom<Address>(),
    chainId: z.number(),
  }),
  newUri: z.string(),
  newCollectionName: z.string(),
});
