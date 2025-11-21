"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { CHAIN_ID } from "@/lib/consts";

const CreatedMomentAirdrop = () => {
  const { createdContract, createdTokenId } = useMomentCreateProvider();

  if (!createdContract || !createdTokenId) return <Fragment />;

  return (
    <TokenProvider
      token={{ tokenContractAddress: createdContract as Address, tokenId: createdTokenId }}
      chainId={CHAIN_ID}
    >
      <MomentAirdrop />
    </TokenProvider>
  );
};

export default CreatedMomentAirdrop;
