import CollectionItem from "./CollectionItem";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";

const Collections = () => {
  const { moments } = useTimelineProvider();

  if (moments)
    return (
      <div className="grow grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10">
        {moments.map((c: TimelineMoment, i) => (
          <CollectionItem c={c} key={i} />
        ))}
      </div>
    );
};

export default Collections;
