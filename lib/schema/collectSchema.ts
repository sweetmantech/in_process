import { z } from "zod";
import addressSchema from "./addressSchema";

export const tokenSchema = z.object({
  tokenId: z.string(),
  tokenContractAddress: addressSchema,
});

export const collectSchema = z.object({
  account: addressSchema,
  token: tokenSchema,
  comment: z.string(),
  amount: z.number(),
});
