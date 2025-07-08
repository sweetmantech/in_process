import { z } from "zod";

// Address schema: type-exact for Viem (0x-prefixed, 40 hex chars)
export const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .brand<`0x${string}`>();

export const bigIntString = z
  .union([z.string(), z.number()])
  .transform((val) => BigInt(val));

export const salesConfigSchema = z.object({
  type: z.string(),
  pricePerToken: z.string(),
  saleStart: bigIntString,
  saleEnd: bigIntString,
  currency: addressSchema.optional(),
});

export const tokenSchema = z.object({
  tokenMetadataURI: z.string(),
  createReferral: addressSchema, // Address
  salesConfig: salesConfigSchema,
  mintToCreatorCount: z.number(),
});

export const contractSchema = z.object({
  name: z.string(),
  uri: z.string(),
});

export const createMomentSchema = z.object({
  contract: contractSchema,
  token: tokenSchema,
  account: addressSchema, // Address
});

export const writingContractSchema = z.object({
  name: z.string(),
});

export const writingTokenSchema = z.object({
  tokenContent: z.string(),
  createReferral: addressSchema, // Address
  salesConfig: salesConfigSchema,
  mintToCreatorCount: z.number(),
});

export const createWritingMomentSchema = z.object({
  contract: writingContractSchema,
  token: writingTokenSchema,
  account: addressSchema, // Address
});
