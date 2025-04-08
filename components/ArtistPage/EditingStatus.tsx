import { useProfileProvider } from "@/providers/ProfileProvider";
import { X } from "lucide-react";

const EditingStatus = () => {
  const { toggleEditing, save } = useProfileProvider();

  return (
    <div className="relative mx-auto md:absolute z-[10000] md:left-1/2 md:left-1/2 md:-translate-x-1/2 bottom-full flex gap-2 items-center w-fit bg-tan-400 px-6 py-2 md:py-3 rounded-full mb-3 md:mb-0">
      <p className="text-sm md:text-lg font-archivo">
        You are in editing mode.
      </p>
      <button
        type="button"
        className="bg-black text-white text-sm font-archivo px-3 py-1 rounded-full"
        onClick={save}
      >
        Save
      </button>
      <button
        type="button"
        className="bg-black text-white rounded-full p-1"
        onClick={toggleEditing}
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default EditingStatus;
