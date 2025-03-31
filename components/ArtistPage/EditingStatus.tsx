import { useProfileProvider } from "@/providers/ProfileProvider";
import { X } from "lucide-react";

const EditingStatus = () => {
  const { toggleEditing, save } = useProfileProvider();

  return (
    <div className="absolute z-[10000] left-1/2 -translate-x-1/2 bottom-full flex gap-2 items-center bg-tan-400 px-6 py-2 rounded-full">
      <p className="font-archivo">You are in editing mode.</p>
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
