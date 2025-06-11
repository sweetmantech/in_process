import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import truncateAddress from "@/lib/truncateAddress";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import truncated from "@/lib/truncated";

const TimelineTableRow = ({ moment }: { moment: TimelineMoment }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={() => push(`/${moment.admin}`)}
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
