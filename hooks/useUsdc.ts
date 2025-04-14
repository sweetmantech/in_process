import { CHAIN, CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { useState } from "react";
import { erc20Abi, maxUint256 } from "viem";
import useConnectedWallet from "./useConnectedWallet";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import { getPublicClient } from "@/lib/viem/publicClient";
import { Address } from "viem";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import { SaleConfig } from "./useTokenSaleConfig";
import { MintType } from "@/types/zora";
import useSignTransaction from "./useSignTransaction";

const useUsdc = () => {
  const { connectedWallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { address } = useAccount();
  const { signTransaction } = useSignTransaction();

  const approve = async () => {
    const args = [erc20MinterAddresses[CHAIN_ID], maxUint256];
    const account = context ? address : connectedWallet;
    const response = await signTransaction({
      address: USDC_ADDRESS,
      account: account as Address,
      abi: erc20Abi as any,
      functionName: "approve",
      args,
      chain: CHAIN,
    });
    return response;
  };

  const hasAllowance = async (sale: SaleConfig | undefined) => {
    if (!sale) return false;
    if (sale.type !== MintType.ZoraErc20Mint) return true;
    const publicClient = getPublicClient(CHAIN_ID);
    const connectedAddress = context ? address : connectedWallet;
    const data = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "allowance",
      args: [connectedAddress as Address, erc20MinterAddresses[CHAIN_ID]],
    });
    return data >= sale.pricePerToken;
  };

  return { approve, hasAllowance };
};

export default useUsdc;
