import { z } from "zod";
import { zeroAddress } from "viem";
import addressSchema from "./addressSchema";

export const withdrawSchema = z.object({
  currency: addressSchema.optional().transform((val) => (val === undefined ? zeroAddress : val)),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Amount must be a valid positive number",
      }
    ),
  to: addressSchema,
});
