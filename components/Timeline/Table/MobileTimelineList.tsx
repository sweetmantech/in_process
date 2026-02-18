import { useState, useCallback } from "react";
import { useVisibleMoments } from "@/hooks/useVisibleMoments";
import TimelineTableRow from "@/components/Timeline/Table/TimelineTableRow";
import FetchMore from "@/components/FetchMore";

const MobileTimelineList = () => {
  const { visibleMoments, hasMore, showMore } = useVisibleMoments();
  const [fetchKey, setFetchKey] = useState(0);

  const handleShowMore = useCallback(() => {
    showMore();
    setFetchKey((k) => k + 1);
  }, [showMore]);

  return (
    <div className="max-h-[40vh] w-full overflow-y-auto mt-4">
      {visibleMoments.map((moment) => (
        <TimelineTableRow key={moment.id} moment={moment} />
      ))}
      {hasMore && <FetchMore key={fetchKey} fetchMore={handleShowMore} />}
    </div>
  );
};

export default MobileTimelineList;
