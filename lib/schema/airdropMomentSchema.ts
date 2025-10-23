import { z } from "zod";
import addressSchema from "./addressSchema";
import bigIntString from "./bigIntSchema";

export const airdropSchema = z.array(
  z.object({
    address: addressSchema,
    tokenId: bigIntString,
  })
);

export const airdropMomentSchema = z.object({
  airdrop: airdropSchema,
  account: addressSchema,
  collection: addressSchema,
});
