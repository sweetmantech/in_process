import { Address } from "viem";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";

const UserName = ({ walletAddress }: { walletAddress: Address }) => {
  const { data: artistProfile } = useArtistProfile(walletAddress);

  const displayName = artistProfile?.username || truncateAddress(walletAddress);

  return <div className="font-archivo">{displayName}</div>;
};

export default UserName;
