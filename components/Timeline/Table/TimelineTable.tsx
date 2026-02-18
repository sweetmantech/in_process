import { useTimelineProvider } from "@/providers/TimelineProvider";
import MobileTimelineList from "@/components/Timeline/Table/MobileTimelineList";
import TimelineTableRowDesktop from "@/components/Timeline/Table/TimelineTableRowDesktop";
import TimelineTableSkeleton from "@/components/Timeline/Table/TimelineTableSkeleton";
import { Table, TableBody } from "@/components/ui/table";
import useIsMobile from "@/hooks/useIsMobile";

const TimelineTable = () => {
  const { moments, isLoading } = useTimelineProvider();
  const isMobile = useIsMobile();

  if (isLoading) {
    return <TimelineTableSkeleton />;
  }

  return (
    <div className="w-full">
      {isMobile ? (
        <MobileTimelineList />
      ) : (
        <div className="no-scrollbar overflow-auto rounded-md md:block md:max-h-[88vh]">
          <Table>
            <TableBody>
              {moments.map((moment) => (
                <TimelineTableRowDesktop key={moment.id} moment={moment} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TimelineTable;
