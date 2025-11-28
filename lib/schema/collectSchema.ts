import { z } from "zod";
import addressSchema from "./addressSchema";
import { CHAIN_ID } from "../consts";

export const momentSchema = z.object({
  tokenId: z.string(),
  collectionAddress: addressSchema,
  chainId: z.number().optional().default(CHAIN_ID),
});

export const collectSchema = z.object({
  moment: momentSchema,
  comment: z.string(),
  amount: z.number(),
});
