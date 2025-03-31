import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent } from "react";

const TextInput = () => {
  const { writingRef, fileUploading, setWritingText, writingText, creating } =
    useZoraCreateProvider();

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-lg bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-white"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setWritingText(e.target.value);
        }}
      />
      <div
        className="p-2 md:p-4 absolute z-[1] left-0 top-0 bg-white"
        ref={writingRef}
        dangerouslySetInnerHTML={{
          __html: writingText.replaceAll("\n", "<br/>"),
        }}
      />
    </div>
  );
};

export default TextInput;
