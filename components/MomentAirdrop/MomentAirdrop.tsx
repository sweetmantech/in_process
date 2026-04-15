"use client";

import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/MomentAirdrop/Airdrop";
import { useMomentProvider } from "@/providers/MomentProvider";

const MomentAirdrop = () => {
  const { isOwner, isSoldOut } = useMomentProvider();

  if (!isOwner || isSoldOut) return null;

  return (
    <AirdropProvider>
      <Airdrop />
    </AirdropProvider>
  );
};

export default MomentAirdrop;
