import { useState, useCallback } from "react";
import { toast } from "sonner";

const useCopy = (text: string, duration = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), duration);
        toast.success("copied!");
      } catch {
        toast.error("Failed to copy.");
      }
    },
    [text, duration]
  );

  return { copied, copy };
};

export default useCopy;
