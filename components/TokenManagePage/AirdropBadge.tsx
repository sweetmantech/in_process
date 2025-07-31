import { useAirdropProvider } from "@/providers/AirdropProvider";
import { AirdropItem } from "@/hooks/useAirdrop";
import truncateAddress from "@/lib/truncateAddress";
import { X } from "lucide-react";

const AirdropBadge = ({ item, i }: { item: AirdropItem; i: number }) => {
  const { removeAddress } = useAirdropProvider();

  return (
    <div
      className={`${item.status === "invalid" ? "bg-red" : "bg-grey-moss-200"} rounded-full w-fit text-white px-4 py-1 flex items-center gap-2 h-fit`}
    >
      {item.status === "validating" ? (
        <p className="font-archivo text-xs md:text-lg">Validating...</p>
      ) : (
        <p className="font-archivo text-xs md:text-lg">
          {item.ensName || truncateAddress(item.address)}
        </p>
      )}
      <button
        onClick={() => removeAddress(i)}
        type="button"
        className={`${item.status === "invalid" ? "text-white" : "text-grey-moss-400"} rounded-full p-0.5`}
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default AirdropBadge;
