"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropButton from "./AirdropButton";
import { AirdropItem } from "@/types/airdrop";
import AirdropBadge from "./AirdropBadge";
import AirdropInput from "./AirdropInput";
import AirdropRecipientsPopup from "./AirdropRecipientsPopup";

const Airdrop = () => {
  const { airdropToItems } = useAirdropProvider();

  return (
    <div className="w-full">
      <div className="relative mt-2 flex w-full flex-col gap-1.5 rounded-lg bg-white py-3 px-2.5 md:w-[420px]">
        <div className="flex h-fit w-full flex-wrap items-start gap-1.5 overflow-hidden">
          {airdropToItems.map((item: AirdropItem, i) => (
            <AirdropBadge item={item} i={i} key={`${i}-${item.address || item.ensName || ""}`} />
          ))}
          <AirdropInput />
        </div>
        <AirdropRecipientsPopup />
      </div>
      <AirdropButton />
    </div>
  );
};

export default Airdrop;
