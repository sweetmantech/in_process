import { ReactNode } from "react";
import useCopy from "@/hooks/useCopy";
import { Copy, Check } from "lucide-react";

const CopyIcon = ({ text, children }: { text: string; children?: ReactNode }) => {
  const { copied, copy } = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1 text-neutral-500 hover:text-black"
    >
      {children}
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </button>
  );
};

export default CopyIcon;
