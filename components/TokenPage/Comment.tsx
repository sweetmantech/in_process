import getUsername from "@/lib/getUsername";
import { useQuery } from "@tanstack/react-query";
import { Address, isAddress } from "viem";

interface CommentProps {
  comment: string;
  sender: Address;
  timestamp: number;
}

export const Comment = ({ comment, sender, timestamp }: CommentProps) => {
  const {
    data: username,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["username", sender],
    queryFn: () => getUsername(sender as Address),
    enabled: !!sender && isAddress(sender),
  });

  console.log({ username, isLoading, error });

  const displayName = isLoading
    ? "Loading..."
    : error
      ? sender
      : username || sender;

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
