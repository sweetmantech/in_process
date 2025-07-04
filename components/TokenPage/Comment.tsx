import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";

interface CommentProps {
  comment: string;
  sender: Address;
  timestamp: number;
}

export const Comment = ({ comment, sender, timestamp }: CommentProps) => {
  const { data: artistProfile, isLoading, error } = useArtistProfile(sender);

  const truncatedAddress = truncateAddress(sender);
  const displayName = isLoading
    ? "Loading..."
    : error
      ? truncatedAddress
      : artistProfile?.username || truncatedAddress;

  return (
    <div className="rounded flex items-end justify-between">
      <div>
        <p className="text-base font-spectral tracking-[-1px]">{comment}</p>
        <p className="text-base font-archivo-medium">{displayName}</p>
      </div>
      <p className="text-sm font-archivo lowercase">
        {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  );
};
