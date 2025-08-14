import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface WritingProps {
  fileUrl: string;
  description: string;
}
const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getText = async () => {
      const response = await fetch(fileUrl);
      const content = await response.text();
      setText(content || description);
      setIsLoading(false);
    };
    if (fileUrl) getText();
  }, [description, fileUrl]);

  if (isLoading) return <Skeleton className="min-h-[200px] size-full" />;

  return (
    <div className="size-full relative bg-grey-eggshell">
      <div className="size-full aspect-[571/692] relative">
        <div className="size-full font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-[#B8B8B0] bg-white relative">
          <textarea
            disabled
            value={text}
            className={cn(
              "relative z-[2] size-full outline-none p-4 bg-grey-eggshell resize-none overflow-y-auto",
              "text-sm md:text-base"
            )}
            readOnly
          />
          <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
          <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
        </div>
      </div>
    </div>
  );
};

export default Writing;
