"use client";

import { useState } from "react";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import {
  getContractAddressFromReceipt,
  getTokenIdFromCreateReceipt,
} from "@/lib/protocolSdk/create/1155-create-helper";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useMask } from "./useMask";
import useBalance from "./useBalance";
import { useUserProvider } from "@/providers/UserProvider";
import useSignTransaction from "./useSignTransaction";

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
  const [creating, setCreating] = useState<boolean>(false);
  const params = useParams();
  const chainId = Number(params.chainId) || CHAIN_ID;
  const collection = params.collectionAddress as Address | undefined;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata } = useZoraCreateParameters(
    chainId,
    collection,
  );
  const mask = useMask();
  const { isPrepared } = useUserProvider();
  const { signTransaction } = useSignTransaction();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      setCreating(true);
      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const { address, account, args, abi, functionName } = parameters;
      let hash: Address | null = null;
      if (balance === 0) hash = await createOnSmartWallet(parameters);
      else
        hash = await signTransaction(
          address,
          account as Address,
          abi,
          functionName,
          args,
        );

      if (!hash) throw new Error();

      const publicClient: any = getPublicClient();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (!collection) {
        const contractAddress = getContractAddressFromReceipt(receipt);
        setCreatedContract(contractAddress);
        setCreatedTokenId("1");
        setCreating(false);
        return { contractAddress, tokenId: 1 };
      }
      const tokenId = getTokenIdFromCreateReceipt(receipt);
      setCreating(false);
      setCreatedContract(collection as Address);
      setCreatedTokenId(tokenId.toString());
      return { contractAddress: collection, tokenId };
    } catch (err) {
      setCreating(false);
      console.error(err);
      throw err;
    }
  };

  return {
    createdContract,
    createdTokenId,
    setCreatedTokenId,
    setCreatedContract,
    create,
    creating,
    ...createMetadata,
    ...mask,
  };
}
