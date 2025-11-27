import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";
import { MintComment } from "@/types/moment";
import { Address } from "viem";

export const Comment = (comment: MintComment) => {
  const { sender, username, timestamp, comment: commentText } = comment;
  const { data } = useArtistProfile(!username ? (sender as Address) : undefined);
  const truncatedAddress = truncateAddress(sender);

  return (
    <div className="rounded flex items-end justify-between">
      <div>
        <p className="text-base font-spectral tracking-[-1px]">{commentText}</p>
        <p className="text-base font-archivo-medium">
          {username || data?.username || truncatedAddress}
        </p>
      </div>
      <p className="text-sm font-archivo lowercase">
        {new Date(timestamp * 1000).toLocaleString()}
      </p>
    </div>
  );
};
