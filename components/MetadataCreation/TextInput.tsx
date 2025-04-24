import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent } from "react";

const TextInput = () => {
  const { writingRef, fileUploading, setWritingText, writingText, creating } =
    useZoraCreateProvider();

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-lg bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-grey-moss-100"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setWritingText(e.target.value);
        }}
      />
      <div
        className="z-[1] p-2 md:p-4 absolute min-h-full left-0 top-0 bg-grey-moss-100 border border-grey-moss-100 flex items-center"
        ref={writingRef}
      >
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
        />
      </div>
    </div>
  );
};

export default TextInput;
