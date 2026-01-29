import { useState, useCallback } from "react";

const useCopy = (text: string, duration = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    },
    [text, duration]
  );

  return { copied, copy };
};

export default useCopy;
