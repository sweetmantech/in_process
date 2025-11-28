"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import MomentAirdrop from "../MomentAirdrop";
import { MomentProvider } from "@/providers/MomentProvider";
import { CHAIN_ID } from "@/lib/consts";
import { Address } from "viem";

const CreatedMomentAirdrop = () => {
  const { createdContract, createdTokenId } = useMomentCreateProvider();

  if (!createdContract || !createdTokenId) return <Fragment />;

  return (
    <MomentProvider
      moment={{
        collectionAddress: createdContract as Address,
        tokenId: createdTokenId,
        chainId: CHAIN_ID,
      }}
    >
      <MomentAirdrop />
    </MomentProvider>
  );
};

export default CreatedMomentAirdrop;
