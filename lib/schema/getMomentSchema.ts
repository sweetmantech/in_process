import { z } from "zod";
import addressSchema from "./addressSchema";

export const getMomentSchema = z.object({
  tokenContract: addressSchema,
  tokenId: z.string().min(1, "Token ID is required"),
  chainId: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val, 10)), {
      message: "Chain ID must be a valid number",
    }),
});
