import useAirdropInput from "@/hooks/useAirdropInput";

const AirdropInput = () => {
  const { handleInput, handlePaste, handleBlur, value, setValue } =
    useAirdropInput();

  return (
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
  );
};

export default AirdropInput;
