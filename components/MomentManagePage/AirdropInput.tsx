import useAirdropInput from "@/hooks/useAirdropInput";
import { useAirdropProvider } from "@/providers/AirdropProvider";

const AirdropInput = () => {
  const { handleInput, handlePaste, handleBlur, value, setValue } = useAirdropInput();
  const { airdopToItems } = useAirdropProvider();

  return (
    <input
      type="text"
      className="h-fit min-w-[300px] px-2 py-1 font-archivo text-xs !outline-0 !ring-0 md:text-lg"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleInput}
      onPaste={handlePaste}
      onBlur={handleBlur}
      autoFocus={true}
      placeholder={airdopToItems.length > 0 ? "" : "Enter any wallet or ENS to airdrop."}
    />
  );
};

export default AirdropInput;
