"use client";

import { CollectionProvider } from "@/providers/CollectionProvider";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/TokenManagePage/Airdrop";
import { useTokenProvider } from "@/providers/TokenProvider";
import { CHAIN_ID } from "@/lib/consts";

const TokenAirdrop = () => {
  const { token } = useTokenProvider();

  return (
    <CollectionProvider
      collection={{
        address: token.tokenContractAddress,
        chainId: token.chainId || CHAIN_ID,
      }}
    >
      <AirdropProvider>
        <Airdrop />
      </AirdropProvider>
    </CollectionProvider>
  );
};

export default TokenAirdrop;
