import { z } from "zod";
import { Address, isAddress } from "viem";

export const updateCollectionURISchema = z.object({
  collection: z.object({
    address: z.custom<Address>((val) => typeof val === "string" && isAddress(val), {
      message: "Invalid Ethereum address",
    }),
    chainId: z.number(),
  }),
  newUri: z.string().min(1, "URI is required"),
  newCollectionName: z.string().min(1, "Collection name is required"),
});
