"use client";

import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/TokenManagePage/Airdrop";
import { Address } from "viem";

const MomentAirdrop = ({
  momentContract,
  tokenId,
}: {
  momentContract: Address;
  tokenId: string;
}) => {
  return (
    <AirdropProvider momentContract={momentContract as Address} tokenId={tokenId}>
      <Airdrop />
    </AirdropProvider>
  );
};

export default MomentAirdrop;
