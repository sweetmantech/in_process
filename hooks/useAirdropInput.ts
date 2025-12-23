import { ClipboardEvent, KeyboardEvent, useState } from "react";
import { useAirdropProvider } from "@/providers/AirdropProvider";

const useAirdropInput = () => {
  const [value, setValue] = useState("");
  const { onChangeAddress } = useAirdropProvider();
  // When the user presses Enter we want to submit whatever is currently in the
  // input. The user might have typed or pasted multiple lines, so we split the
  // value on new-lines, trim each entry and ignore blank rows.
  const handleInput = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const items = value
        .split(/\r?\n/) // handle both Windows and Unix newlines
        .map((item) => item.trim())
        .filter(Boolean);

      if (items.length > 0) {
        // Add to airdropToItems immediately for UI feedback (with status "validating")
        for (const item of items) {
          onChangeAddress(item);
        }
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

    if (items.length > 0) {
      // Add to airdropToItems immediately for UI feedback (with status "validating")
      // Resolution will happen on button click via onAirdrop
      for (const item of items) {
        onChangeAddress(item);
      }
    }
    setValue("");
  };

  const handleBlur = async () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      // Add to airdropToItems immediately for UI feedback (with status "validating")
      onChangeAddress(trimmedValue);
    }
    setValue("");
  };

  return {
    handleInput,
    handlePaste,
    handleBlur,
    value,
    setValue,
  };
};

export default useAirdropInput;
