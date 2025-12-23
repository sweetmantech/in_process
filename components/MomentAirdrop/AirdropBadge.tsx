import { useAirdropProvider } from "@/providers/AirdropProvider";
import { AirdropItem } from "@/types/airdrop";
import truncateAddress from "@/lib/truncateAddress";
import { X } from "lucide-react";

const AirdropBadge = ({ item, i }: { item: AirdropItem; i: number }) => {
  const { removeAddress } = useAirdropProvider();

  return (
    <div
      className={`${item.status === "invalid" ? "bg-red" : "bg-grey-moss-200"} flex h-fit w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-white`}
    >
      {item.status === "validating" ? (
        <p className="font-archivo text-xs">Validating...</p>
      ) : (
        <p className="font-archivo text-xs">{item.ensName || truncateAddress(item.address)}</p>
      )}
      <button
        onClick={() => removeAddress(i)}
        type="button"
        className={`${item.status === "invalid" ? "text-white" : "text-grey-moss-400"} rounded-full p-0.5 hover:opacity-70 transition-opacity`}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
};

export default AirdropBadge;
