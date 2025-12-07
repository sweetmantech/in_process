import useAirdropInput from "@/hooks/useAirdropInput";

const AirdropInput = () => {
  const { handleInput, handlePaste, handleBlur, value, setValue } = useAirdropInput();

  return (
    <input
      type="text"
      className="h-fit px-2 py-1 font-archivo text-xs !outline-0 !ring-0 md:text-lg"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleInput}
      onPaste={handlePaste}
      onBlur={handleBlur}
      autoFocus={true}
    />
  );
};

export default AirdropInput;
