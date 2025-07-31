"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropButton from "./AirdropButton";
import { AirdropItem } from "@/hooks/useAirdrop";
import AirdropBadge from "./AirdropBadge";
import AirdropInput from "./AirdropInput";

const Airdrop = () => {
  const { airdopToItems } = useAirdropProvider();

  return (
    <div className="px-4 md:px-10 w-full">
      <div className="pt-4 w-full flex flex-col gap-2 bg-white max-w-xl rounded-2xl mt-4 p-4 min-h-[400px]">
        <div className="flex w-full h-fit flex-wrap gap-2 items-start overflow-hidden">
          {airdopToItems.map((item: AirdropItem, i) => (
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
