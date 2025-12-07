import { EditIcon } from "../ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "./SocialAccounts";
import { Skeleton } from "../ui/skeleton";
import EditingStatus from "./EditingStatus";
import useArtistEditable from "@/hooks/useArtistEditable";

const MobileProfile = () => {
  const {
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
  const { isEditable } = useArtistEditable();

  if (isEditing)
    return (
      <div className="relative">
        {isEditing && (
          <div className="fixed left-0 top-0 z-[99999999] flex h-screen w-screen flex-col gap-3 bg-[#605f5ccc] px-4">
            <EditingStatus />
            <input
              type="text"
              className="px-2 py-1 font-archivo !outline-none !ring-0"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              ref={usernameRef}
            />
            <textarea
              ref={bioRef}
              rows={4}
              className="px-2 py-1 font-spectral !outline-none !ring-0"
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
      <div className="flex items-center gap-3 md:gap-4">
        <p className="font-archivo-medium text-xl tracking-[-1px] md:text-5xl">
          {isLoading ? <Skeleton className="h-12 w-[150px]" /> : username}
        </p>
        {isEditable && !isEditing && (
          <button
            type="button"
            className="rounded-xs border border-grey-moss-900 bg-grey-moss-200 p-1"
            onClick={toggleEditing}
          >
            <EditIcon width={20} height={20} />
          </button>
        )}
      </div>

      <p className="pt-2 font-spectral text-lg md:pt-4 md:text-xl">
        {isLoading ? <Skeleton className="h-8 w-[200px]" /> : bio}
      </p>
      <SocialAccounts />
    </div>
  );
};

export default MobileProfile;
