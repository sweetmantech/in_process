"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { MomentProvider } from "@/providers/MomentProvider";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";

const CreatedMomentAirdrop = () => {
  const { createdContract } = useMomentCreateProvider();
  const params = useParams();
  const tokenId = params.tokenId as string;

  return (
    <MomentProvider
      moment={{
        collectionAddress: createdContract as Address,
        tokenId,
        chainId: CHAIN_ID,
      }}
    >
      <MomentAirdrop />
    </MomentProvider>
  );
};

export default CreatedMomentAirdrop;
