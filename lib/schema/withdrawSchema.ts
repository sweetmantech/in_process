import { z } from "zod";
import { zeroAddress } from "viem";
import addressSchema from "./addressSchema";

export const withdrawSchema = z.object({
  to: addressSchema,
  currency: addressSchema.optional().transform((val) => (val === undefined ? zeroAddress : val)),
  amount: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true; // Optional - if not provided, defaults to full balance
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Amount must be a valid positive number",
      }
    ),
  chainId: z.number().int().optional().default(8453),
});
