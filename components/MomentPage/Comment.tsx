import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/truncateAddress";
import { MintComment } from "@/types/moment";
import { Address } from "viem";

export const Comment = (comment: MintComment) => {
  const { sender, username, timestamp, comment: commentText } = comment;
  const { data } = useArtistProfile(!username ? (sender as Address) : undefined);
  const truncatedAddress = truncateAddress(sender);

  return (
    <div className="flex items-end justify-between rounded">
      <div>
        <p className="font-spectral text-base tracking-[-1px]">{commentText}</p>
        <p className="font-archivo-medium text-base">
          {username || data?.username || truncatedAddress}
        </p>
      </div>
      <p className="font-archivo text-sm lowercase">{new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};
