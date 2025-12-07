import { useProfileProvider } from "@/providers/ProfileProvider";

const EditingStatus = () => {
  const { saving, statusRef } = useProfileProvider();

  return (
    <div
      className={`relative z-[10000] mx-auto mt-16 flex w-fit items-center gap-2 rounded-full px-6 py-1.5 md:absolute md:bottom-full md:left-1/2 md:m-0 md:-translate-x-1/2 ${saving ? "bg-grey-moss-50" : "bg-grey-moss-900"}`}
      ref={statusRef}
    >
      <div className="flex items-center gap-2">
        {!saving && (
          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-grey-moss-50">
            <div className="h-[6px] w-[6px] rounded-full bg-grey-moss-50" />
          </div>
        )}
        <p
          className={`font-spectral-italic text-sm md:text-lg ${saving ? "text-grey-moss-900" : "text-grey-moss-50"}`}
        >
          {saving ? "saved!" : "editing your profile"}
        </p>
      </div>
    </div>
  );
};

export default EditingStatus;
