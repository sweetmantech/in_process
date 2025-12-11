"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropButton from "./AirdropButton";
import { AirdropItem } from "@/hooks/useAirdrop";
import AirdropBadge from "./AirdropBadge";
import AirdropInput from "./AirdropInput";

const Airdrop = () => {
  const { airdropToItems } = useAirdropProvider();

  return (
    <div className="w-full">
      <div className="mt-4 flex min-h-[400px] w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-4 pt-4">
        <div className="flex h-fit w-full flex-wrap items-start gap-2 overflow-hidden">
          {airdropToItems.map((item: AirdropItem, i) => (
            <AirdropBadge item={item} i={i} key={item.address} />
          ))}
          <AirdropInput />
        </div>
      </div>
      <AirdropButton />
    </div>
  );
};

export default Airdrop;
