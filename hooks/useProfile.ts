import { useParams } from "next/navigation";
import useConnectedWallet from "./useConnectedWallet";
import { useEffect, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";

const useProfile = () => {
  const { data } = useArtistProfile();
  const { connectedWallet } = useConnectedWallet();
  const [socialAccounts, setSocialAccounts] = useState<any>(null);
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const { artistAddress } = useParams();
  const canEdit =
    connectedWallet?.toLowerCase() ===
      new String((artistAddress as string) || "").toLowerCase() &&
    Boolean(connectedWallet);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  useEffect(() => {
    if (data) {
      setUserName(data.displayName);
      setBio(data.description || "");
      setSocialAccounts(data.socialAccounts);
    }
  }, [data]);

  return {
    canEdit,
    isEditing,
    toggleEditing,
    username,
    setUserName,
    bio,
    setBio,
    socialAccounts,
  };
};

export default useProfile;
