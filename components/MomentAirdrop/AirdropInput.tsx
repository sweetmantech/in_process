"use client";

import { useState } from "react";
import useAirdropInput from "@/hooks/useAirdropInput";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import AirdropRecipientsPopup from "./AirdropRecipientsPopup";

const AirdropInput = () => {
  const { handleInput, handlePaste, handleBlur, value, setValue } = useAirdropInput();
  const { airdropToItems } = useAirdropProvider();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="h-fit min-w-[200px] px-2 py-0.5 font-archivo text-xs !outline-0 !ring-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleInput}
          onPaste={handlePaste}
          onBlur={handleBlur}
          autoFocus={true}
          placeholder={airdropToItems.length > 0 ? "" : "Enter any wallet or ENS to airdrop."}
        />
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="h-fit whitespace-nowrap rounded px-2 py-0.5 font-archivo text-xs text-neutral-600 hover:bg-neutral-100"
        >
          regular addies
        </button>
      </div>
      <AirdropRecipientsPopup isOpen={isPopupOpen} onOpenChange={setIsPopupOpen} />
    </>
  );
};

export default AirdropInput;
