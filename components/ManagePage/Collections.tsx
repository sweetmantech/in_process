import CollectionItem from "./CollectionItem";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";

const Collections = () => {
  const { moments } = useTimelineProvider();

  if (moments)
    return (
      <div className="grid grow grid-cols-1 gap-6 px-4 md:grid-cols-4 md:px-10">
        {moments.map((c: TimelineMoment, i) => (
          <CollectionItem c={c} key={i} />
        ))}
      </div>
    );
};

export default Collections;
