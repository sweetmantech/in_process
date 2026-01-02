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
  maxSupply: z.number().int().min(1).optional(),
});

// Unified contract schema - supports both existing collection (address) and new collection (name/uri)
export const contractSchema = z
  .object({
    address: addressSchema.optional(),
    name: z.string().optional(),
    uri: z.string().optional(),
  })
  .refine(
    (data) => {
      // If address is provided, use existing collection (name/uri not needed)
      if (data.address) {
        return true;
      }
      // If address is not provided, name and uri are required for new collection
      return data.name !== undefined && data.uri !== undefined;
    },
    {
      message:
        "Either contract.address must be provided, or both contract.name and contract.uri must be provided",
      path: ["contract"],
    }
  );

// Base schema with common fields and splits validation
const baseCreateMomentSchema = z.object({
  contract: contractSchema,
  token: tokenSchema,
  account: addressSchema,
  splits: z.array(splitSchema).optional(),
});

// Unified schema that accepts the unified contract format
export const createMomentSchema = baseCreateMomentSchema.refine(
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

// Unified writing contract schema - same as regular contract schema
export const writingContractSchema = contractSchema;

export const writingTokenSchema = z.object({
  tokenContent: z.string(),
  createReferral: addressSchema,
  salesConfig: salesConfigSchema,
  mintToCreatorCount: z.number(),
  payoutRecipient: addressSchema.optional(),
});

export const createWritingMomentSchema = z
  .object({
    title: z.string(),
    contract: writingContractSchema,
    token: writingTokenSchema,
    account: addressSchema,
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
