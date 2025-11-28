import { z } from "zod";
import addressSchema from "./addressSchema";
import { CHAIN_ID } from "../consts";

export const getMomentSchema = z.object({
  collectionAddress: addressSchema,
  tokenId: z.string().min(1, "Token ID is required"),
  chainId: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val, 10)), {
      message: "Chain ID must be a valid number",
    })
    .default(CHAIN_ID.toString()),
});
