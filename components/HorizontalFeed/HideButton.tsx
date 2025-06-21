import { Eye, EyeOff } from "lucide-react";
import type { FC, ButtonHTMLAttributes } from "react";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";

interface HideButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  moment: TimelineMoment;
  onClick?: () => void;
}

/**
 * HideButton: toggles hidden/visible state with eye/eye-off icon.
 * Computes hidden state and calls toggleMoment from context. Usage: <HideButton moment={...} />
 */
const HideButton: FC<HideButtonProps> = ({
  moment,
  className = "",
  onClick,
  ...props
}) => {
  const { hiddenMoments } = useTimelineProvider();
  const isHidden = hiddenMoments.some(
    (ele) =>
      ele.tokenContract === moment.address.toLowerCase() &&
      ele.tokenId === moment.tokenId
  );
  return (
    <button
      type="button"
      className={`bg-grey-moss-200 border border-grey-moss-900 px-1 py-1 rounded ${className}`}
      aria-label={isHidden ? "Unhide" : "Hide"}
      onClick={(e) => {
        e.stopPropagation();
        toggleMoment(moment);
        toast(isHidden ? "Moment visible" : "Moment hidden");
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
