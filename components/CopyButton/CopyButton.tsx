import { toast } from "sonner";
import truncateAddress from "@/lib/truncateAddress";
import { useState } from "react";
import AnimatedCopyIcon from "./AnimatedCopyIcon";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  address: string;
  className?: string;
  shorten?: boolean;
}

const CopyButton = ({ address, className = "", shorten = true }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    toast.success("copied!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
      {shorten ? truncateAddress(address) : address}
      <AnimatedCopyIcon isCopied={isCopied} />
    </button>
  );
};

export default CopyButton;
