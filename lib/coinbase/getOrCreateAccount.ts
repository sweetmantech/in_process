import cdp from "@/lib/coinbase/client";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";
import { type Address } from "viem";
import { deterministicAccountName } from "./deterministricAccountName";

export async function getOrCreateAccount({
  address,
}: {
  address: Address;
}): Promise<EvmSmartAccount> {
  const evmAccount = await cdp.evm.getOrCreateAccount({
    name: deterministicAccountName(address),
  });

  const smartAccount = await cdp.evm.getSmartAccount({
    address: evmAccount.address,
    owner: evmAccount
  })

  return smartAccount;
}
