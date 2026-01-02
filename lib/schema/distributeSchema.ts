import { z } from "zod";
import addressSchema from "./addressSchema";

export const distributeSchema = z.object({
  splitAddress: addressSchema,
  tokenAddress: addressSchema,
  chainId: z
    .string()
    .optional()
    .refine((val) => val === undefined || (!isNaN(Number(val)) && Number(val) > 0), {
      message: "chainId must be a positive number",
    })
    .transform((val) => (val ? Number(val) : undefined)),
});
