import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const TextInput = () => {
  const { textInputRef, fileUploading } = useZoraCreateProvider();

  return (
    <textarea
      className="size-full !font-spectral shadow-lg p-4 !outline-none bg-white p-2 disabled:cursor-not-allowed"
      ref={textInputRef}
      disabled={Boolean(fileUploading)}
    />
  );
};

export default TextInput;
