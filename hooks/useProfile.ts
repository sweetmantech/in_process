import { useParams } from "next/navigation";
import useConnectedWallet from "./useConnectedWallet";
import { useEffect, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";

const saveIndentify = async (
  artistAddress: Address,
  username: string,
  bio: string,
) => {
  await fetch("/api/profile/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ walletAddress: artistAddress, username, bio }),
  });
};

const useProfile = () => {
  const { data, isLoading } = useArtistProfile();
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
      setUserName(data.username || "Your username");
      setBio(data.bio || "Your bio");
    }
  }, [data]);

  const save = async () => {
    saveIndentify(artistAddress as Address, username, bio);
    toggleEditing();
  };

  return {
    canEdit,
    isEditing,
    toggleEditing,
    username,
    setUserName,
    bio,
    setBio,
    socialAccounts,
    save,
    isLoading,
  };
};

export default useProfile;
