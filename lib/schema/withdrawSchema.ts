import { z } from "zod";
import addressSchema from "./addressSchema";

export const withdrawSchema = z.object({
  to: addressSchema,
  currency: z.enum(["usdc", "eth"]),
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
