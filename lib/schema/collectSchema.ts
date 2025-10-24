import { z } from "zod";
import addressSchema from "./addressSchema";

export const momentSchema = z.object({
  tokenId: z.string(),
  contractAddress: addressSchema,
});

export const collectSchema = z.object({
  moment: momentSchema,
  comment: z.string(),
  amount: z.number(),
});
