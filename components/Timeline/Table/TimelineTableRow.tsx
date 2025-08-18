import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import truncateAddress from "@/lib/truncateAddress";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import truncated from "@/lib/truncated";
import { getShortNetworkNameFromChainId } from "@/lib/zora/zoraToViem";

const TimelineTableRow = ({ moment }: { moment: TimelineMoment }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();

  const handleClick = () => {
    const shortNetworkName = getShortNetworkNameFromChainId(moment.chainId);
    if (shortNetworkName) {
      const tokenId = moment.tokenId === "0" ? "1" : moment.tokenId;
      push(`/collect/${shortNetworkName}:${moment.address}/${tokenId}`);
    }
  };

  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={handleClick}
    >
      <div>
        <p className="font-spectral-italic text-base text-left">
          {truncated(data?.name || "")}
        </p>
        <p className="font-archivo text-[11px] text-left">
          {new Date(moment.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="font-archivo text-sm text-right">
        {moment.username || truncateAddress(moment.admin)}
      </p>
    </button>
  );
};

export default TimelineTableRow;
