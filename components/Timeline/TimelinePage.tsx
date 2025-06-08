import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Loading from "@/components/Loading";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";
import TimelineSpiral from "@/components/Timeline/TimelineSpiral";
import TimelineTable from "@/components/Timeline/Table/TimelineTable";
import TimelineMobileMoon from "@/components/Timeline/TimelineMobileMoon";
import HorizontalTimeline from "@/components/Timeline/HorizontalTimeline";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";

const TimelinePage = () => {
  const { data, isLoading, error, moments } = useTimelineApiContext();
  const tokens = mapMomentsToTokens(moments);

  if (isLoading)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  if (error) return <main>Error loading timeline.</main>;

  const totalCount = data?.pagination.total_count ?? 0;

  return (
    <main className="px-2 md:px-10 relative grow flex flex-col">
      <MomentCount count={totalCount} />
      <div className="flex justify-center md:justify-start">
        <CreateButton />
      </div>
      <TimelineSpiral />
      <div className="pt-28">
        <TimelineMobileMoon />
      </div>
      <TimelineTable />
      <div className="block md:hidden overflow-hidden h-[300px] pb-20">
        <HorizontalFeedAnimationProvider feeds={tokens}>
          <HorizontalTimeline />
        </HorizontalFeedAnimationProvider>
      </div>
    </main>
  );
};

export default TimelinePage;
