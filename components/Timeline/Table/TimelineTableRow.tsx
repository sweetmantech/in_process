import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import truncateAddress from "@/lib/truncateAddress";
import { Moment } from "@/types/timeline";
import truncated from "@/lib/truncated";

const TimelineTableRow = ({ moment }: { moment: Moment }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={() => push(`/${moment.admins[0].address}`)}
    >
      <div>
        <p className="font-spectral-italic text-base text-left">{truncated(data?.name || "")}</p>
        <p className="font-archivo text-[11px] text-left">
          {new Date(moment.created_at).toLocaleString()}
        </p>
      </div>
      <p className="font-archivo text-sm text-right">
        {moment.admins[0].username || truncateAddress(moment.admins[0].address)}
      </p>
    </button>
  );
};

export default TimelineTableRow;
