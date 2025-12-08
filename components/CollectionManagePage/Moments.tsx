import MomentItem from "./MomentItem";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { TimelineMoment } from "@/types/moment";

const Moments = () => {
  const { moments } = useTimelineProvider();

  if (moments)
    return (
      <div className="grow w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-10 pt-6">
        {moments.map((m: TimelineMoment) => (
          <MomentItem m={m} key={m.id} />
        ))}
      </div>
    );
};

export default Moments;
