"use client";

import { useState } from "react";
import { Address } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useUserProvider } from "@/providers/UserProvider";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { CHAIN_ID } from "@/lib/consts";
import useCollectionParam from "./useCollectionParam";
import { useRouter } from "next/navigation";
import useTypeParam from "./useTypeParam";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const collection = useCollectionParam();
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();
  const { mimeType, setUploadProgress, setIsUploading } = useMetadataFormProvider();
  const { push } = useRouter();
  const type = useTypeParam();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      if (!collection) {
        toast.error("No collection selected");
        return;
      }

      setCreating(true);
      setIsUploading(true);
      setUploadProgress(0);

      const parameters = await fetchParameters(collection as Address);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMomentApi(parameters);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const accessToken = await getAccessToken();

      setCreating(false);
      setIsUploading(false);
      setUploadProgress(100);
      setCreatedTokenId(result.tokenId.toString());

      if (mimeType.includes("video") && accessToken) {
        await migrateMuxToArweaveApi(
          {
            collectionAddress: result.contractAddress as Address,
            tokenIds: [result.tokenId.toString()],
            chainId: CHAIN_ID,
          },
          accessToken
        );
      }
      const typeParam = type ? `type=${type}&` : "";
      const collectionParam = collection ? `collectionAddress=${collection}&` : "";
      push(`/create/success?${typeParam}${collectionParam}tokenId=${result.tokenId.toString()}`);
      return result;
    } catch (err: any) {
      setCreating(false);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(err?.message || "Error creating");
    }
  };

  return {
    createdTokenId,
    setCreatedTokenId,
    create,
    creating,
  };
}
