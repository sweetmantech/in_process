import { EyeOff } from "lucide-react";
import type { FC, ButtonHTMLAttributes } from "react";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";

interface HideButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  moment: TimelineMoment;
  onClick?: () => void;
}

/**
 * HideButton: toggles hidden/visible state with eye-off icon.
 * Calls toggleMoment to update server state. Usage: <HideButton moment={...} />
 */
const HideButton: FC<HideButtonProps> = ({
  moment,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`bg-grey-moss-200 border border-grey-moss-900 px-1 py-1 rounded ${className}`}
      aria-label="Toggle visibility"
      onClick={(e) => {
        e.stopPropagation();
        toggleMoment(moment);
        toast("Moment visibility toggled");
        onClick?.();
      }}
      {...props}
    >
      <EyeOff className="size-4 text-grey-eggshell" />
    </button>
  );
};

export default HideButton;
