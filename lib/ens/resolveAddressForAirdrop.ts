import { isAddress } from "viem";
import resolveEnsToAddress from "./resolveEnsToAddress";
import { AirdropItem } from "@/types/airdrop";

const resolveAddressForAirdrop = async (value: string): Promise<AirdropItem> => {
  if (!value) {
    return { address: "", status: "invalid", ensName: "" };
  }

  if (isAddress(value)) {
    return {
      address: value,
      status: "valid",
      ensName: "",
    };
  }

  const ensAddress = await resolveEnsToAddress(value);

  return {
    address: ensAddress || "",
    status: ensAddress ? "valid" : "invalid",
    ensName: value,
  };
};

export default resolveAddressForAirdrop;
