import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

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
    <div
      className="font-spectral bg-grey-moss-100 p-2 rounded-md text-md !normal-case text-left"
      dangerouslySetInnerHTML={{
        __html: text.replaceAll("\n", "<br/>"),
      }}
    />
  );
};

export default Writing;
