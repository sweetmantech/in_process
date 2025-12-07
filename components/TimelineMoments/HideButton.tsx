import { Eye, EyeOff } from "lucide-react";
import { FC, ButtonHTMLAttributes, MouseEvent } from "react";
import { type TimelineMoment } from "@/types/moment";
import { useToggleMoment } from "@/hooks/useToggleMoment";

interface HideButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
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
}): React.ReactElement => {
  const { isHidden, toggle } = useToggleMoment(moment);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    await toggle();
    onClick?.();
  };

  return (
    <button
      type="button"
      className={`rounded border border-grey-moss-900 bg-grey-moss-200 px-1 py-1 ${className}`}
      aria-label="Toggle visibility"
      onClick={handleClick}
      {...props}
    >
      {isHidden ? (
        <EyeOff className="size-4 text-grey-eggshell" />
      ) : (
        <Eye className="size-4 text-grey-eggshell" />
      )}
    </button>
  );
};

export default HideButton;
