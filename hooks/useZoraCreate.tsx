"use client";

import { useState } from "react";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { getContractAddressFromReceipt } from "@/lib/protocolSdk/create/1155-create-helper";
import { getPublicClient } from "@/lib/viem/publicClient";

export default function useZoraCreate() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const [creating, setCreating] = useState<boolean>(false);
  const params = useParams();
  const chainId = Number(params.chainId) || CHAIN_ID;
  const collection = params.collection as Address | undefined;
  const { fetchParameters, createMetadata } = useZoraCreateParameters(
    chainId,
    collection
  );

  const create = async () => {
    setCreating(true);
    try {
      if (!address) {
        throw new Error("No wallet connected");
      }
      await switchChainAsync({ chainId });
      console.log("fetching parameters");

      const parameters = await fetchParameters();
      console.log("parameters", parameters);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }

      const hash = await writeContractAsync({
        ...parameters,
      });

      const publicClient = await getPublicClient();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const contractAddress = getContractAddressFromReceipt(receipt);
      return { contractAddress };
    } catch (err) {
      setCreating(false);
      console.error(err);
      throw err;
    }
  };

  return { create, creating, ...createMetadata };
}
