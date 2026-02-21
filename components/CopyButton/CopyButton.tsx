import truncateAddress from "@/lib/truncateAddress";
import useCopy from "@/hooks/useCopy";
import AnimatedCopyIcon from "./AnimatedCopyIcon";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  shorten?: boolean;
  children?: ReactNode;
}

const CopyButton = ({ text, className = "", shorten = true, children }: CopyButtonProps) => {
  const { copied: isCopied, copy } = useCopy(text);

  const handleCopy = (e: React.MouseEvent) => {
    copy(e);
  };

  return (
    <button
      className={cn(
        "flex w-fit items-center gap-2 rounded-md bg-grey-moss-200 px-3 py-1 font-archivo text-grey-eggshell hover:text-tan-primary",
        className
      )}
      type="button"
      onClick={handleCopy}
    >
      {children ?? (shorten ? truncateAddress(text) : text)}
      <AnimatedCopyIcon isCopied={isCopied} />
    </button>
  );
};

export default CopyButton;
