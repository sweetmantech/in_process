import { useProfileProvider } from "@/providers/ProfileProvider";

const EditingStatus = () => {
  const { saving, statusRef } = useProfileProvider();

  return (
    <div
      className={`relative mx-auto md:absolute z-[10000] md:left-1/2 md:bottom-full mt-16 md:m-0
        md:-translate-x-1/2 flex gap-2 items-center w-fit px-6 py-1.5 rounded-full
    ${saving ? "bg-grey-moss-50" : "bg-grey-moss-900"}`}
      ref={statusRef}
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
    </div>
  );
};

export default EditingStatus;
