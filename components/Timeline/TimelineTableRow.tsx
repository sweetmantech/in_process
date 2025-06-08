import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";

const TimelineFeedRow = ({ moment }: { moment: any }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();
  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={() => push(`/${moment.address}`)}
    >
      <div>
        <p className="font-spectral-italic text-base">
          {`${data?.name?.slice(0, 60) || ""}${(data?.name?.length || 0) > 60 ? "..." : ""}`}
        </p>
        <p className="font-archivo text-[11px] text-left">
          {new Date(moment.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="font-archivo text-sm text-right">
        {truncateAddress(moment.address)}
      </p>
    </button>
  );
};

const TimelineTableRow = () => {
  const { moments } = useTimelineApiContext();
  return (
    <div className="w-full">
      {/* Mobile: scrollable list with max height */}
      <div className="md:hidden max-h-[25vh] overflow-y-auto w-full">
        {moments.map((moment) => (
          <TimelineFeedRow key={moment.id} moment={moment} />
        ))}
      </div>
      {/* Desktop: full list, no scroll constraint */}
      <div className="hidden md:block w-full">
        {moments.map((moment) => (
          <TimelineFeedRow key={moment.id} moment={moment} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTableRow;
