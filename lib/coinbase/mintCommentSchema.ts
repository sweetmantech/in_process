import { z } from "zod";
import addressSchema from "../schema/addressSchema";

export const tokenSchema = z.object({
  tokenId: z.number(),
  tokenContractAddress: addressSchema,
});

export const mintCommentSchema = z.object({
  account: addressSchema,
  to: addressSchema,
  token: tokenSchema,
  comment: z.string(),
  amount: z.number(),
});
