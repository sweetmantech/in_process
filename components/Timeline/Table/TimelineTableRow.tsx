import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import truncateAddress from "@/lib/truncateAddress";

const TimelineTableRow = ({ moment }: { moment: any }) => {
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
        {truncateAddress(moment.admin)}
      </p>
    </button>
  );
};

export default TimelineTableRow;
