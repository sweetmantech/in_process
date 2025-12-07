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
      className="flex w-full items-start justify-between p-4"
      onClick={() => push(`/${moment.default_admin.address}`)}
    >
      <div>
        <p className="text-left font-spectral-italic text-base">{truncated(data?.name || "")}</p>
        <p className="text-left font-archivo text-[11px]">
          {new Date(moment.created_at).toLocaleString()}
        </p>
      </div>
      <p className="text-right font-archivo text-sm">
        {moment.default_admin.username || truncateAddress(moment.default_admin.address)}
      </p>
    </button>
  );
};

export default TimelineTableRow;
