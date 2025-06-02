import { Eye, EyeOff } from "lucide-react";
import type { FC, ButtonHTMLAttributes } from "react";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { Moment } from "@/hooks/useTimeline";

interface HideButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  moment: Moment;
}

/**
 * HideButton: toggles hidden/visible state with eye/eye-off icon.
 * Computes hidden state and calls toggleMoment from context. Usage: <HideButton moment={...} />
 */
const HideButton: FC<HideButtonProps> = ({
  moment,
  className = "",
  ...props
}) => {
  const { hiddenMoments, toggleMoment } = useTimelineProvider();
  const isHidden = hiddenMoments.some(
    (ele) =>
      ele.tokenContract === moment.tokenContract.toLowerCase() &&
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
