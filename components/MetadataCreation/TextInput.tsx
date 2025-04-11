import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent } from "react";
const TextInput = () => {
  const { writingRef, fileUploading, setWritingText, writingText, creating } =
    useZoraCreateProvider();

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-lg bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-gray-200"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setWritingText(e.target.value);
        }}
      />
      <div
        className="p-2 md:p-4 absolute z-[1] left-0 top-0 bg-white w-full h-full border border-gray-200 flex items-center bg-gray-200"
        ref={writingRef}
      >
        <div
          className="w-full max-h-full overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
        />
      </div>
    </div>
  );
};

export default TextInput;
