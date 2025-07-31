"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import { KeyboardEvent, ClipboardEvent, useState } from "react";
import AirdropButton from "./AirdropButton";
import { X } from "lucide-react";
import { AirdropItem } from "@/hooks/useAirdrop";
import truncateAddress from "@/lib/truncateAddress";

const Airdrop = () => {
  const { airdopToItems, onChangeAddress, removeAddress } =
    useAirdropProvider();
  const [value, setValue] = useState("");

  // When the user presses Enter we want to submit whatever is currently in the
  // input. The user might have typed or pasted multiple lines, so we split the
  // value on new-lines, trim each entry and ignore blank rows.
  const handleInput = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const items = value
        .split(/\r?\n/) // handle both Windows and Unix newlines
        .map((item) => item.trim())
        .filter(Boolean);

      for (const item of items) {
        await onChangeAddress(item);
      }
      setValue("");
    }
  };

  // Support pasting a column of cells (e.g. from Google Sheets / Docs). We
  // intercept the paste event, extract the text, split on new-lines, and add
  // each non-empty row as a separate address to validate. We prevent the
  // default paste behaviour so that the raw multi-line text is not inserted
  // into the input field.
  const handlePaste = async (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    const items = text
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    for (const item of items) {
      await onChangeAddress(item);
    }

    // Clear the input after processing the pasted data so the user can type
    // again immediately.
    setValue("");
  };

  const handleBlur = async () => {
    await onChangeAddress(value);
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
