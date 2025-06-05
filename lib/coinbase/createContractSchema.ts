import { z } from "zod";

export const salesConfigSchema = z.object({
  type: z.string(),
  pricePerToken: z.string(),
  saleStart: z.number(),
  saleEnd: z.number(),
  currency: z.string().optional(),
});

export const tokenSchema = z.object({
  tokenMetadataURI: z.string(),
  createReferral: z.string(), // Address
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
  account: z.string(), // Address
});
