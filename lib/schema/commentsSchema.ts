import { z } from "zod";
import addressSchema from "./addressSchema";

export const momentSchema = z.object({
  tokenId: z.string(),
  contractAddress: addressSchema,
});

export const commentsSchema = z.object({
  moment: momentSchema,
  chainId: z.number(),
  offset: z.number(),
});
