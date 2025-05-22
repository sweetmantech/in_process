import { EditIcon } from "../ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "./SocialAccounts";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";
import EditingStatus from "./EditingStatus";

const DesktopProfile = () => {
  const {
    canEdit,
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

  return (
    <Fragment>
      {isEditing && <EditingStatus />}
      <div className="relative">
        <div className="flex gap-3 md:gap-4 items-center">
          {isEditing ? (
            <input
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="max-w-[120px] md:!max-w-[200px] text-xl md:text-4xl p-1 md:p-3 bg-grey-moss-50 outline-none ring-0 font-archivo-medium"
            />
          ) : (
            <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
              {isLoading ? <Skeleton className="w-[150px] h-12" /> : username}
            </p>
          )}
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
        {isEditing ? (
          <input
            type="text"
            ref={bioRef}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="max-w-[150px] md:max-w-auto md:min-w-[250px] outline-none ring-0 p-1 md:p-2 font-spectral text-lg md:text-xl mt-2 md:mt-4 bg-grey-moss-50"
          />
        ) : (
          <p className="text-lg md:text-xl font-spectral pt-2">
            {isLoading ? <Skeleton className="w-[200px] h-8" /> : bio}
          </p>
        )}
        <SocialAccounts />
      </div>
    </Fragment>
  );
};

export default DesktopProfile;
