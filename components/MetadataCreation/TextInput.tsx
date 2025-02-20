import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const TextInput = () => {
  const { setName, setTextInputActive, textInputRef, fileUploading } =
    useZoraCreateProvider();

  return (
    <textarea
      className="size-full !outline-none bg-white p-2 disabled:cursor-not-allowed"
      onChange={(e) => setName(e.target.value.slice(0, 10))}
      onFocus={() => setTextInputActive(true)}
      ref={textInputRef}
      disabled={fileUploading}
    />
  );
};

export default TextInput;
