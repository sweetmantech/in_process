import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";
import { EditIcon } from "../ui/icons";
import { useParams } from "next/navigation";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "./SocialAccounts";

const ArtistProfile = () => {
  const { artistAddress } = useParams();
  const {
    canEdit,
    isEditing,
    toggleEditing,
    username,
    bio,
    setUserName,
    setBio,
  } = useProfileProvider();

  return (
    <div className="relative">
      <div className="flex gap-6 items-center">
        {isEditing ? (
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="!max-w-[200px] text-4xl p-3 bg-tan-400 outline-none ring-0 font-archivo-medium"
          />
        ) : (
          <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
            {username || truncateAddress(artistAddress as Address)}
          </p>
        )}
        {canEdit && !isEditing && (
          <button
            type="button"
            className="border-[1px] border-black rounded-md p-1 bg-tan-400"
            onClick={toggleEditing}
          >
            <EditIcon />
          </button>
        )}
      </div>
      {isEditing ? (
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-w-[250px] outline-none ring-0 p-2 font-spectral text-xl mt-2 md:mt-4 bg-tan-400"
        />
      ) : (
        <p className="text-lg md:text-xl font-spectral pt-2 md:pt-4">
          {bio || ""}
        </p>
      )}
      <SocialAccounts />
    </div>
  );
};

export default ArtistProfile;
