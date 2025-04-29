"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import { KeyboardEvent, useState } from "react";
import AirdropButton from "./AirdropButton";
import { X } from "lucide-react";
import { AirdropItem } from "@/hooks/useAirdrop";
import truncateAddress from "@/lib/truncateAddress";

const Airdrop = () => {
  const { airdopToItems, onChangeAddress, removeAddress } =
    useAirdropProvider();
  const [value, setValue] = useState("");

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChangeAddress(value);
      setValue("");
    }
  };

  const handleBlur = () => {
    onChangeAddress(value);
    setValue("");
  };

  return (
    <div className="px-4 md:px-10 w-full">
      <div className="pt-4 w-full flex flex-col gap-2 bg-white max-w-xl rounded-2xl mt-4 p-4 min-h-[400px]">
        <div className="flex w-full h-fit flex-wrap gap-2 items-start overflow-hidden">
          {airdopToItems.map((item: AirdropItem, i) => (
            <div
              className={`${item.status === "invalid" ? "bg-red" : "bg-grey-moss-200"} rounded-full w-fit text-white px-4 py-1 flex items-center gap-2 h-fit`}
              key={i}
            >
              {item.status === "validating" ? (
                <p className="font-archivo text-xs md:text-lg">Validating...</p>
              ) : (
                <p className="font-archivo text-xs md:text-lg">
                  {item.ensName || truncateAddress(item.address)}
                </p>
              )}
              <button
                onClick={() => removeAddress(i)}
                type="button"
                className={`${item.status === "invalid" ? "text-white" : "text-grey-moss-400"} rounded-full p-0.5`}
              >
                <X className="size-5" />
              </button>
            </div>
          ))}
          <input
            type="text"
            className="h-fit py-1 px-2 font-archivo !outline-0 !ring-0 text-xs md:text-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleInput}
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
