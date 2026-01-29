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
      className={`rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-lg active:scale-95 ${className}`}
      aria-label="Toggle visibility"
      onClick={handleClick}
      {...props}
    >
      {isHidden ? (
        <EyeOff className="size-4 text-grey-moss-400" />
      ) : (
        <Eye className="size-4 text-grey-moss-900" />
      )}
    </button>
  );
};

export default HideButton;
