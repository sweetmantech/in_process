import {Pencil1Icon} from "@radix-ui/react-icons";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      type="button"
      className="absolute right-4 top-4 text-white bg-grey rounded-full p-2 z-[3] disabled:bg-gray-200 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      <Pencil1Icon className="size-4" />
    </button>
  );
};

export default EditButton;
