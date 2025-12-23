"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropButton from "./AirdropButton";
import { AirdropItem } from "@/types/airdrop";
import AirdropBadge from "./AirdropBadge";
import AirdropInput from "./AirdropInput";

const Airdrop = () => {
  const { airdropToItems } = useAirdropProvider();

  return (
    <div className="w-full">
      <div className="mt-2 flex w-full max-w-xl flex-col gap-1.5 rounded-lg bg-white py-3 px-2.5">
        <div className="flex h-fit w-full flex-wrap items-start gap-1.5 overflow-hidden">
          {airdropToItems.map((item: AirdropItem, i) => (
            <AirdropBadge item={item} i={i} key={`${i}-${item.address || item.ensName || ""}`} />
          ))}
          <AirdropInput />
        </div>
      </div>
      <AirdropButton />
    </div>
  );
};

export default Airdrop;
