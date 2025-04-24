import { useProfileProvider } from "@/providers/ProfileProvider";
import { X } from "lucide-react";

const EditingStatus = () => {
  const { toggleEditing, save, saving } = useProfileProvider();

  return (
    <div
      className={`relative mx-auto md:absolute z-[10000] md:left-1/2 md:left-1/2 md:-translate-x-1/2 bottom-full flex gap-2 items-center w-fit px-6 py-1 rounded-full mb-3 md:mb-0
    ${saving ? "bg-grey-moss-50" : "bg-grey-moss-900"}`}
    >
      <div className="flex items-center gap-2">
        {!saving && (
          <div className="w-4 h-4 border border-grey-moss-50 rounded-full flex items-center justify-center">
            <div className="w-[6px] h-[6px] rounded-full bg-grey-moss-50" />
          </div>
        )}
        <p
          className={`text-sm md:text-lg font-spectral-italic ${saving ? "text-grey-moss-900" : "text-grey-moss-50"}`}
        >
          {saving ? "saved!" : "editing your profile"}
        </p>
      </div>
      {!saving && (
        <>
          <button
            type="button"
            className="bg-grey-moss-100 text-grey-moss-900 text-sm font-archivo px-3 rounded-full"
            onClick={save}
          >
            save
          </button>
          <button
            type="button"
            className="bg-grey-moss-100 text-grey-moss-900 rounded-full p-0.5"
            onClick={toggleEditing}
          >
            <X className="size-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default EditingStatus;
