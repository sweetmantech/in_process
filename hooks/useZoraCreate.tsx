"use client";

import { useState } from "react";
import { useSwitchChain, useWriteContract } from "wagmi";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { getContractAddressFromReceipt } from "@/lib/protocolSdk/create/1155-create-helper";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useMask } from "./useMask";
import useBalance from "./useBalance";

const createOnSmartWallet = async (parameters: any) => {
  const response = await fetch(`/api/smartwallet/sendUserOperation`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      parameters,
    }),
  });

  const data = await response.json();

  return data.transactionHash;
};

export default function useZoraCreate() {
  const { balance } = useBalance();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const [creating, setCreating] = useState<boolean>(false);
  const params = useParams();
  const chainId = Number(params.chainId) || CHAIN_ID;
  const collection = params.collection as Address | undefined;
  const [createdContract, setCreatedContract] = useState("");
  const { fetchParameters, createMetadata } = useZoraCreateParameters(
    chainId,
    collection,
  );
  const mask = useMask();

  const create = async (uri: string) => {
    try {
      setCreating(true);
      const parameters = await fetchParameters(uri);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }

      let hash: Address | null = null;
      await switchChainAsync({ chainId });
      if (balance === 0) hash = await createOnSmartWallet(parameters);
      else
        hash = await writeContractAsync({
          ...parameters,
        });

      if (!hash) throw new Error();

      const publicClient = getPublicClient();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const contractAddress = getContractAddressFromReceipt(receipt);
      setCreating(false);
      setCreatedContract(contractAddress);
      return { contractAddress };
    } catch (err) {
      setCreating(false);
      console.error(err);
      throw err;
    }
  };

  return {
    createdContract,
    setCreatedContract,
    create,
    creating,
    ...createMetadata,
    ...mask,
  };
}
