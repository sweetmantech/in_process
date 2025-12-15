"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { MomentProvider } from "@/providers/MomentProvider";
import { CHAIN_ID } from "@/lib/consts";
import useCollectionParam from "@/hooks/useCollectionParam";

const CreatedMomentAirdrop = () => {
  const { createdTokenId } = useMomentCreateProvider();
  const collection = useCollectionParam();
  if (!createdTokenId) return <Fragment />;

  return (
    <MomentProvider
      moment={{
        collectionAddress: collection as Address,
        tokenId: createdTokenId,
        chainId: CHAIN_ID,
      }}
    >
      <MomentAirdrop />
    </MomentProvider>
  );
};

export default CreatedMomentAirdrop;
