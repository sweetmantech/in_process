import TimelineTableRowDesktopSkeleton from "@/components/Timeline/Table/TimelineTableRowDesktopSkeleton";
import TimelineTableRowSkeleton from "@/components/Timeline/Table/TimelineTableRowSkeleton";
import { Table, TableBody } from "@/components/ui/table";

const TimelineTableSkeleton = () => (
  <div className="w-full">
    <div className="no-scrollbar hidden overflow-auto rounded-md md:block md:max-h-[88vh]">
      <Table>
        <TableBody>
          {Array.from({ length: 15 }).map((_, i) => (
            <TimelineTableRowDesktopSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="max-h-[25vh] w-full overflow-y-auto md:hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <TimelineTableRowSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default TimelineTableSkeleton;
