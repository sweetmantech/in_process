"use client";

import { TokenProvider } from "@/providers/TokenProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/TokenManagePage/Airdrop";
import { CHAIN_ID } from "@/lib/consts";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Address } from "viem";
import { Fragment } from "react";

const CreatedMomentAirdrop = () => {
  const { createdContract, createdTokenId } = useMomentCreateProvider();

  if (!createdContract || !createdTokenId) return <Fragment />;

  return (
    <TokenProvider
      token={{
        tokenContractAddress: createdContract as Address,
        tokenId: createdTokenId,
      }}
      chainId={CHAIN_ID}
    >
      <CollectionProvider
        collection={{
          address: createdContract as Address,
          chainId: CHAIN_ID,
        }}
      >
        <AirdropProvider>
          <Airdrop />
        </AirdropProvider>
      </CollectionProvider>
    </TokenProvider>
  );
};

export default CreatedMomentAirdrop;
