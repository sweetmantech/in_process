"use client";

import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { MomentProvider } from "@/providers/MomentProvider";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";
import useCollectionParam from "@/hooks/useCollectionParam";
import { Fragment } from "react";

const CreatedMomentAirdrop = () => {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const collection = useCollectionParam();

  if (!collection) return <Fragment />;

  return (
    <MomentProvider
      moment={{
        collectionAddress: collection as Address,
        tokenId,
        chainId: CHAIN_ID,
      }}
    >
      <MomentAirdrop />
    </MomentProvider>
  );
};

export default CreatedMomentAirdrop;
