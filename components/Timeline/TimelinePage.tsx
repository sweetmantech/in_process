import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Loading from "@/components/Loading";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

const TimelinePage = () => {
  const { data, moments, isLoading, error } = useTimelineApiContext();

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
      <h1>Timeline</h1>
      <ul>
        {moments.map((moment: TimelineMoment) => (
          <li key={moment.id}>
            <strong>{moment.id}</strong>: {moment.uri}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TimelinePage;
