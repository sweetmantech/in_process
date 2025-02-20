import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const TextInput = () => {
  const { setName, setTextInputActive, textInputRef } = useZoraCreateProvider();

  return (
    <textarea
      className="size-full !outline-none p-2"
      onChange={(e) => setName(e.target.value.slice(0, 10))}
      onFocus={() => setTextInputActive(true)}
      ref={textInputRef}
    />
  );
};

export default TextInput;
