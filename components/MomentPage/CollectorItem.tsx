import truncateAddress from "@/lib/truncateAddress";
import { Collector } from "@/types/moment";
import CopyIcon from "./CopyIcon";
import { EXPLORER_URL } from "@/lib/consts";
import { useUserProvider } from "@/providers/UserProvider";

const CollectorItem = ({ collector, username, amount, transactionHash, timestamp }: Collector) => {
  const { artistWallet } = useUserProvider();
  const isYou = artistWallet?.toLowerCase() === collector.toLowerCase();

  return (
    <div className="px-1 md:px-2 space-y-0.5">
      <div className="flex items-center justify-between">
        <p className="font-archivo text-sm font-medium">
          {isYou ? "me" : username || truncateAddress(collector)}
        </p>
        <p className="font-archivo text-sm">{amount}x</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-archivo text-[11px] text-neutral-400">
        <CopyIcon text={collector}>{truncateAddress(collector)}</CopyIcon>
        <span className="text-neutral-300">|</span>
        <CopyIcon text={`${EXPLORER_URL}/tx/${transactionHash}`}>
          tx {truncateAddress(transactionHash)}
        </CopyIcon>
        <span className="text-neutral-300">|</span>
        <span className="lowercase">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CollectorItem;
