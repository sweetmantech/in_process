import { useTimelineApiContext } from "@/providers/TimelineApiProvider";

const TimelinePage = () => {
  const { moments, isLoading, error } = useTimelineApiContext();

  if (isLoading) return <main>Loading…</main>;
  if (error) return <main>Error loading timeline.</main>;

  return (
    <main>
      <h1>Timeline</h1>
      <ul>
        {moments.map((moment) => (
          <li key={moment.id}>
            <strong>{moment.id}</strong>: {moment.uri}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TimelinePage;
