import { Eye, EyeOff } from "lucide-react";
import type { FC, ButtonHTMLAttributes } from "react";
import { useState, useEffect } from "react";
import { Address } from "viem";
import { toast } from "sonner";

export interface Moment {
  owner: Address;
  tokenContract: Address;
  tokenId: string;
}

interface HideButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  moment: Moment;
  onClick?: () => void;
}

/**
 * HideButton: toggles hidden/visible state with eye/eye-off icon.
 * Self-contained component that manages its own hidden state and API calls.
 * Usage: <HideButton moment={...} />
 */
const HideButton: FC<HideButtonProps> = ({
  moment,
  className = "",
  onClick,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if moment is hidden on component mount
  useEffect(() => {
    const checkHiddenStatus = async () => {
      try {
        const response = await fetch(`/api/token/timeline`);
        const data = await response.json();
        const hiddenMoments = JSON.parse(data.tagData.hidden || '[]').map((item: any) => ({
          ...item,
          tokenId: String(item.tokenId),
        }));
        
        const hidden = hiddenMoments.some(
          (ele: Moment) =>
            ele.tokenContract.toLowerCase() === moment.tokenContract.toLowerCase() &&
            ele.tokenId === moment.tokenId
        );
        setIsHidden(hidden);
      } catch (error) {
        console.error('Error checking hidden status:', error);
      }
    };

    checkHiddenStatus();
  }, [moment.tokenContract, moment.tokenId]);

  const toggleMoment = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const newHiddenState = !isHidden;
    
    // Optimistic update
    setIsHidden(newHiddenState);
    
    try {
      await fetch("/api/token/hide", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ moment }),
      });
      
      toast(newHiddenState ? "Moment hidden" : "Moment visible");
    } catch (error) {
      // Revert optimistic update on error
      setIsHidden(!newHiddenState);
      toast.error("Failed to update moment visibility");
      console.error('Error toggling moment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`bg-grey-moss-200 border border-grey-moss-900 px-1 py-1 rounded ${className} ${isLoading ? 'opacity-50' : ''}`}
      aria-label={isHidden ? "Unhide" : "Hide"}
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation();
        toggleMoment();
        onClick?.();
      }}
      {...props}
    >
      {isHidden ? (
        <Eye className="size-4 text-grey-eggshell" />
      ) : (
        <EyeOff className="size-4 text-grey-eggshell" />
      )}
    </button>
  );
};

export default HideButton;
