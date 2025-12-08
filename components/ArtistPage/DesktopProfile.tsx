import { EditIcon } from "../ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "./SocialAccounts";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";
import EditingStatus from "./EditingStatus";
import useArtistEditable from "@/hooks/useArtistEditable";

const DesktopProfile = () => {
  const {
    isEditing,
    toggleEditing,
    username,
    bio,
    setUserName,
    setBio,
    isLoading,
    usernameRef,
    bioRef,
  } = useProfileProvider();
  const { isEditable } = useArtistEditable();

  return (
    <Fragment>
      {isEditing && <EditingStatus />}
      <div className="relative">
        <div className="flex items-center gap-3 md:gap-4">
          {isEditing ? (
            <input
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="max-w-[120px] bg-grey-moss-50 p-1 font-archivo-medium text-xl outline-none ring-0 md:!max-w-[200px] md:p-3 md:text-4xl"
            />
          ) : (
            <p className="font-archivo-medium text-xl tracking-[-1px] md:text-5xl">
              {isLoading ? <Skeleton className="h-12 w-[150px]" /> : username}
            </p>
          )}
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
        {isEditing ? (
          <input
            type="text"
            ref={bioRef}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="md:max-w-auto mt-2 max-w-[150px] bg-grey-moss-50 p-1 font-spectral text-lg outline-none ring-0 md:mt-4 md:min-w-[250px] md:p-2 md:text-xl"
          />
        ) : (
          <p className="pt-2 font-spectral text-lg md:text-xl">
            {isLoading ? <Skeleton className="h-8 w-[200px]" /> : bio}
          </p>
        )}
        <SocialAccounts />
      </div>
    </Fragment>
  );
};

export default DesktopProfile;
