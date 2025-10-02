import { toast } from "sonner";
import truncateAddress from "@/lib/truncateAddress";
import { useState } from "react";
import AnimatedCopyIcon from "./AnimatedCopyIcon";

interface CopyButtonProps {
  address: string;
  className?: string;
  showTruncated?: boolean;
}

const CopyButton = ({
  address,
  className = "flex gap-2 items-center font-archivo bg-grey-moss-200 text-grey-eggshell hover:text-tan-primary w-fit px-3 py-1 rounded-md",
  showTruncated = true,
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    toast.success("copied!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button className={className} type="button" onClick={handleCopy}>
      {showTruncated ? truncateAddress(address) : address}
      <AnimatedCopyIcon isCopied={isCopied} />
    </button>
  );
};

export default CopyButton;
