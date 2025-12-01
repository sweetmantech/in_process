import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import truncateAddress from "@/lib/truncateAddress";
import { type TimelineMoment } from "@/types/moment";
import truncated from "@/lib/truncated";

const TimelineTableRow = ({ moment }: { moment: TimelineMoment }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={() => push(`/${moment.default_admin.address}`)}
    >
      <div>
        <p className="font-spectral-italic text-base text-left">{truncated(data?.name || "")}</p>
        <p className="font-archivo text-[11px] text-left">
          {new Date(moment.created_at).toLocaleString()}
        </p>
      </div>
      <p className="font-archivo text-sm text-right">
        {moment.default_admin.username || truncateAddress(moment.default_admin.address)}
      </p>
    </button>
  );
};

export default TimelineTableRow;
