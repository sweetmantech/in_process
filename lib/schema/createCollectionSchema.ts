import { z } from "zod";
import addressSchema from "./addressSchema";
import { splitSchema } from "./createMomentSchema";
import { validateSplitAddress } from "@/lib/splits/validateSplitAddress";
import { calculateTotalPercentage } from "@/lib/splits/calculateTotalPercentage";

export const createCollectionSchema = z
  .object({
    account: addressSchema,
    uri: z.string().min(1, "URI is required"),
    name: z.string().min(1, "Collection name is required"),
    splits: z.array(splitSchema).optional(),
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
