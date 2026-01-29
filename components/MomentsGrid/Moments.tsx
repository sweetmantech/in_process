import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";
import MomentsSkeleton from "./MomentsSkeleton";
import NoMomentsFound from "./NoMomentsFound";
import MomentItem, { type MomentItemVariant } from "./MomentItem";

interface MomentsProps {
  variant?: MomentItemVariant;
}

const Moments = ({ variant = "collection" }: MomentsProps) => {
  const { moments, isLoading } = useTimelineProvider();

  if (isLoading) return <MomentsSkeleton />;
  if (moments.length === 0) return <NoMomentsFound />;

  return (
    <div className="grid w-full grow grid-cols-2 gap-3 px-4 md:grid-cols-5 md:px-10">
      {moments.map((m: TimelineMoment) => (
        <MomentItem m={m} key={m.id} variant={variant} />
      ))}
    </div>
  );
};

export default Moments;
