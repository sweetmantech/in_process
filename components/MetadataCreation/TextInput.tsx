import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent } from "react";

const TextInput = () => {
  const { textInputRef, fileUploading, setName } = useZoraCreateProvider();

  return (
    <textarea
      className="size-full !font-spectral shadow-lg p-4 !outline-none bg-white p-2 disabled:cursor-not-allowed"
      ref={textInputRef}
      disabled={Boolean(fileUploading)}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setName(
          `${e.target.value.slice(0, 10)}${e.target.value.length > 10 ? "..." : ""}`,
        )
      }
    />
  );
};

export default TextInput;
