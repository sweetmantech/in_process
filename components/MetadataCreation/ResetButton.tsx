import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { Pencil1Icon } from "@radix-ui/react-icons";

interface ResetButtonProps {
  onReset?: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  const { resetFiles } = useMomentFormProvider();

  const handleClick = () => {
    resetFiles();
    onReset?.();
  };

  return (
    <button
      type="button"
      className="absolute right-4 top-4 text-white bg-grey rounded-full p-2 z-[3]"
      onClick={handleClick}
    >
      <Pencil1Icon className="size-4" />
    </button>
  );
};

export default ResetButton;
