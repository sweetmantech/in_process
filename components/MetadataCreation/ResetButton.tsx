import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { TrashIcon } from "@radix-ui/react-icons";

interface ResetButtonProps {
  onReset?: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  const { resetFiles } = useMetadataFormProvider();

  const handleClick = () => {
    resetFiles();
    onReset?.();
  };

  return (
    <button
      type="button"
      className="absolute right-4 top-4 z-[99999] rounded-full bg-grey p-2 text-white"
      onClick={handleClick}
    >
      <TrashIcon className="size-4" />
    </button>
  );
};

export default ResetButton;
