import { z } from "zod";
import { validateSplitAddress } from "@/lib/splits/validateSplitAddress";
import { calculateTotalPercentage } from "@/lib/splits/calculateTotalPercentage";

export const formSplitSchema = z.object({
  address: z.string().min(1, "Address is required"),
  percentAllocation: z
    .number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be at most 100"),
});

export const createFormSchema = z
  .object({
    name: z.string().min(1, "Title is required"),
    price: z
      .string()
      .min(1, "Price is required")
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num >= 0;
        },
        { message: "Price must be a valid number" }
      ),
    priceUnit: z.enum(["eth", "usdc"], {
      required_error: "Currency is required",
    }),
    description: z.string().optional(),
    startDate: z.date().optional(),
    splits: z.array(formSplitSchema).optional(),
    totalSupply: z
      .number()
      .int("Total supply must be a whole number")
      .min(1, "Total supply must be at least 1")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.splits || data.splits.length === 0) {
        return true;
      }

      if (data.splits.length < 2) {
        return false;
      }

      for (const split of data.splits) {
        const addressError = validateSplitAddress(split.address);
        if (addressError) {
          return false;
        }
      }

      return calculateTotalPercentage(data.splits) === 100;
    },
    (data) => {
      if (!data.splits || data.splits.length === 0) {
        return {
          message: "Splits total percentage must equal 100%",
          path: ["splits"],
        };
      }

      if (data.splits.length < 2) {
        return {
          message: "Splits must have at least 2 recipients",
          path: ["splits"],
        };
      }

      for (let i = 0; i < data.splits.length; i++) {
        const addressError = validateSplitAddress(data.splits[i].address);
        if (addressError) {
          return {
            message: `Split ${i + 1}: ${addressError}`,
            path: ["splits", i, "address"],
          };
        }
      }

      return {
        message: "Splits total percentage must equal 100%",
        path: ["splits"],
      };
    }
  );

export type CreateFormData = z.infer<typeof createFormSchema>;
