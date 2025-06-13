import truncateAddress from "@/lib/truncateAddress";

interface CommentProps {
  comment: string;
  sender: string;
  timestamp: number;
}

export const Comment = ({ comment, sender, timestamp }: CommentProps) => {
  return (
    <div className="rounded flex items-end justify-between">
      <div>
        <p className="text-base font-spectral tracking-[-1px]">{comment}</p>
        <p className="text-base font-archivo-medium">
          {truncateAddress(sender)}
        </p>
      </div>
      <p className="text-sm font-archivo lowercase">
        {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  );
};
