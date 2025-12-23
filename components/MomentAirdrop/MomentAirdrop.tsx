"use client";

import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/MomentAirdrop/Airdrop";

const MomentAirdrop = () => {
  return (
    <AirdropProvider>
      <Airdrop />
    </AirdropProvider>
  );
};

export default MomentAirdrop;
