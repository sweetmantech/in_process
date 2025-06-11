import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import TimelineTableRow from "@/components/Timeline/Table/TimelineTableRow";
import TimelineTableRowDesktop from "@/components/Timeline/Table/TimelineTableRowDesktop";
import { Table, TableBody } from "@/components/ui/table";

const TimelineTable = () => {
  const { moments } = useTimelineApiContext();

  return (
    <div className="w-full">
      {/* Desktop: table layout */}
      <div className="hidden md:block rounded-md overflow-auto md:max-h-[88vh] no-scrollbar">
        <Table>
          <TableBody>
            {moments.map((moment) => (
              <TimelineTableRowDesktop key={moment.id} moment={moment} />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile: scrollable list */}
      <div className="md:hidden max-h-[25vh] overflow-y-auto w-full">
        {moments.map((moment) => (
          <TimelineTableRow key={moment.id} moment={moment} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTable;
