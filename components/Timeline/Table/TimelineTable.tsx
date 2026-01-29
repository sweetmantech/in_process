import { useTimelineProvider } from "@/providers/TimelineProvider";
import TimelineTableRow from "@/components/Timeline/Table/TimelineTableRow";
import TimelineTableRowDesktop from "@/components/Timeline/Table/TimelineTableRowDesktop";
import TimelineTableSkeleton from "@/components/Timeline/Table/TimelineTableSkeleton";
import { Table, TableBody } from "@/components/ui/table";

const TimelineTable = () => {
  const { moments, isLoading } = useTimelineProvider();

  if (isLoading) {
    return <TimelineTableSkeleton />;
  }

  return (
    <div className="w-full">
      {/* Desktop: table layout */}
      <div className="no-scrollbar hidden overflow-auto rounded-md md:block md:max-h-[88vh]">
        <Table>
          <TableBody>
            {moments.map((moment) => (
              <TimelineTableRowDesktop key={moment.id} moment={moment} />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile: scrollable list */}
      <div className="max-h-[25vh] w-full overflow-y-auto md:hidden">
        {moments.map((moment) => (
          <TimelineTableRow key={moment.id} moment={moment} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTable;
