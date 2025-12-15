import { z } from "zod";
import addressSchema from "./addressSchema";
import bigIntString from "./bigIntSchema";
import { validateSplitAddress } from "@/lib/splits/validateSplitAddress";
import { calculateTotalPercentage } from "@/lib/splits/calculateTotalPercentage";

export const salesConfigSchema = z.object({
  type: z.string(),
  pricePerToken: z.string(),
  saleStart: bigIntString,
  saleEnd: bigIntString,
  currency: addressSchema.optional(),
});

export const splitSchema = z.object({
  address: z.string().min(1, "Address is required"),
  percentAllocation: z.number().min(0).max(100),
});

export const tokenSchema = z.object({
  tokenMetadataURI: z.string(),
  createReferral: addressSchema,
  salesConfig: salesConfigSchema,
  mintToCreatorCount: z.number(),
  payoutRecipient: addressSchema.optional(),
});

export const contractSchema = z.object({
  name: z.string(),
  uri: z.string(),
});

// Schema for adding token to existing contract
export const createMomentSchema = z
  .object({
    token: tokenSchema,
    account: addressSchema,
    contractAddress: addressSchema,
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

export const writingContractSchema = z.object({
  name: z.string(),
});

export const writingTokenSchema = z.object({
  tokenContent: z.string(),
  createReferral: addressSchema,
  salesConfig: salesConfigSchema,
  mintToCreatorCount: z.number(),
});

export const createWritingMomentSchema = z.object({
  contract: writingContractSchema,
  token: writingTokenSchema,
  account: addressSchema,
});
