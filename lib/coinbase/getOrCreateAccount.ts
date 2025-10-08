import cdp from "@/lib/coinbase/client";
import { EvmServerAccount } from "@coinbase/cdp-sdk";
import { type Address } from "viem";
import { deterministicAccountName } from "./deterministricAccountName";

export async function getOrCreateAccount({
  address,
}: {
  address: Address;
}): Promise<EvmServerAccount> {
  const smartWallet = await cdp.evm.getOrCreateAccount({
    name: deterministicAccountName(address),
  });

  return smartWallet;
}
