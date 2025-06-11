import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import TimelineTableRow from "@/components/Timeline/Table/TimelineTableRow";

const TimelineTable = () => {
  const { moments } = useTimelineApiContext();

  return (
    <div className="w-full">
      <div className="max-h-[25vh] md:max-h-[88vh] overflow-y-auto w-full">
        {moments.map((moment) => (
          <TimelineTableRow key={moment.id} moment={moment} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTable;
