"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";

const CreatedMomentAirdrop = () => {
  const { createdContract, createdTokenId } = useMomentCreateProvider();

  if (!createdContract || !createdTokenId) return <Fragment />;

  return (
    <MomentAirdrop momentContract={createdContract as Address} tokenId={createdTokenId as string} />
  );
};

export default CreatedMomentAirdrop;
