"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropButton from "./AirdropButton";
import { AirdropItem } from "@/hooks/useAirdrop";
import useAirdropInput from "@/hooks/useAirdropInput";
import AirdropBadge from "./AirdropBadge";

const Airdrop = () => {
  const { airdopToItems } = useAirdropProvider();
  const { handleInput, handlePaste, handleBlur, value, setValue } =
    useAirdropInput();

  return (
    <div className="px-4 md:px-10 w-full">
      <div className="pt-4 w-full flex flex-col gap-2 bg-white max-w-xl rounded-2xl mt-4 p-4 min-h-[400px]">
        <div className="flex w-full h-fit flex-wrap gap-2 items-start overflow-hidden">
          {airdopToItems.map((item: AirdropItem, i) => (
            <AirdropBadge item={item} i={i} key={item.address} />
          ))}
          <input
            type="text"
            className="h-fit py-1 px-2 font-archivo !outline-0 !ring-0 text-xs md:text-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleInput}
            onPaste={handlePaste}
            onBlur={handleBlur}
            autoFocus={true}
          />
        </div>
      </div>
      <AirdropButton />
    </div>
  );
};

export default Airdrop;
