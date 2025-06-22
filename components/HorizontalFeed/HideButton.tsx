import { Eye, EyeOff } from "lucide-react";
import { FC, ButtonHTMLAttributes, MouseEvent } from "react";
import type { TimelineMoment } from "@/hooks/useTimelineApi";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";

interface HideButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  moment: TimelineMoment;
  onClick?: (() => void) | undefined;
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
}): JSX.Element => {
  const handleClick = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.stopPropagation();

    try {
      const response = await toggleMoment(moment);

      // Use the actual updated data from the server response
      if (response.success && response.updated && response.updated.length > 0) {
        const updatedMoment = response.updated[0];
        toast(updatedMoment.hidden ? "Moment hidden" : "Moment revealed");
      } else {
        toast("Moment visibility toggled");
      }

      onClick?.();
    } catch (error) {
      console.error("Failed to toggle moment visibility:", error);
      toast("Failed to toggle moment visibility");
    }
  };

  return (
    <button
      type="button"
      className={`bg-grey-moss-200 border border-grey-moss-900 px-1 py-1 rounded ${className}`}
      aria-label="Toggle visibility"
      onClick={handleClick}
      {...props}
    >
      {moment.hidden ? (
        <EyeOff className="size-4 text-grey-eggshell" />
      ) : (
        <Eye className="size-4 text-grey-eggshell" />
      )}
    </button>
  );
};

export default HideButton;
