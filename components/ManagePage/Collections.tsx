import CollectionItem from "./CollectionItem";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { TimelineMoment } from "@/hooks/useTimelineApi";

const Collections = () => {
  const { moments } = useTimelineApiContext();

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
