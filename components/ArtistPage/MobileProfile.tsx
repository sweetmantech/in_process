import { EditIcon } from "../ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "./SocialAccounts";
import { Skeleton } from "../ui/skeleton";
import EditingStatus from "./EditingStatus";

const MobileProfile = () => {
  const {
    canEdit,
    isEditing,
    toggleEditing,
    username,
    bio,
    isLoading,
    setUserName,
    setBio,
    usernameRef,
    bioRef,
  } = useProfileProvider();

  if (isEditing)
    return (
      <div className="relative">
        {isEditing && (
          <div className="px-4 flex flex-col gap-3 fixed w-screen h-screen left-0 top-0 z-[99999999] bg-[#605f5ccc]">
            <EditingStatus />
            <input
              type="text"
              className="px-2 py-1 font-archivo !ring-0 !outline-none"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              ref={usernameRef}
            />
            <textarea
              ref={bioRef}
              rows={4}
              className="px-2 py-1 font-spectral !ring-0 !outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <SocialAccounts />
          </div>
        )}
      </div>
    );
  return (
    <div className="relative">
      <div className="flex gap-3 md:gap-4 items-center">
        <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
          {isLoading ? <Skeleton className="w-[150px] h-12" /> : username}
        </p>
        {canEdit && !isEditing && (
          <button
            type="button"
            className="border border-grey-moss-900 rounded-xs p-1 bg-grey-moss-200"
            onClick={toggleEditing}
          >
            <EditIcon width={20} height={20} />
          </button>
        )}
      </div>

      <p className="text-lg md:text-xl font-spectral pt-2 md:pt-4">
        {isLoading ? <Skeleton className="w-[200px] h-8" /> : bio}
      </p>
      <SocialAccounts />
    </div>
  );
};

export default MobileProfile;
