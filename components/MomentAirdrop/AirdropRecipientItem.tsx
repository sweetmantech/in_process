import truncateAddress from "@/lib/truncateAddress";
import { AirdropRecipient } from "@/types/airdrop";

interface AirdropRecipientItemProps {
  recipient: AirdropRecipient;
  isActive: boolean;
  onClick: (address: string) => void;
}

const AirdropRecipientItem = ({ recipient, isActive, onClick }: AirdropRecipientItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(recipient.address)}
      className={`rounded-lg border px-4 py-2 text-left font-archivo text-sm transition-colors ${
        isActive
          ? "border-grey-moss-900 bg-grey-moss-300 text-grey-moss-900"
          : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50"
      }`}
    >
      <div className="font-medium">{recipient.username || truncateAddress(recipient.address)}</div>
      {recipient.username && (
        <div className="text-xs text-neutral-500">{truncateAddress(recipient.address)}</div>
      )}
    </button>
  );
};

export default AirdropRecipientItem;
