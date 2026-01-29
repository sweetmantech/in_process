import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";
import MomentsSkeleton from "./MomentsSkeleton";
import NoMomentsFound from "./NoMomentsFound";
import MomentItem from "./MomentItem";

const Moments = () => {
  const { moments, isLoading } = useTimelineProvider();

  if (isLoading) return <MomentsSkeleton />;
  if (moments.length === 0) return <NoMomentsFound />;
  return (
    <div className="grid grow grid-cols-1 gap-6 px-4 md:grid-cols-4 md:px-10">
      {moments.map((m: TimelineMoment, i) => (
        <MomentItem m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Moments;
