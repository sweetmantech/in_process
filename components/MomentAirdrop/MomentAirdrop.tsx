"use client";

import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/MomentManagePage/Airdrop";

const MomentAirdrop = () => {
  return (
    <AirdropProvider>
      <Airdrop />
    </AirdropProvider>
  );
};

export default MomentAirdrop;
