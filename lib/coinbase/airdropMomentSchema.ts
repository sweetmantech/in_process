import { z } from "zod";
import addressSchema from "./addressSchema";
export const bigIntString = z.union([z.string(), z.number()]).transform((val) => BigInt(val));

export const airdropSchema = z.array(
  z.object({
    address: addressSchema,
    tokenId: bigIntString
  })
);

export const airdropMomentSchema = z.object({
  airdrop: airdropSchema,
  account: addressSchema,
  collection: addressSchema
});