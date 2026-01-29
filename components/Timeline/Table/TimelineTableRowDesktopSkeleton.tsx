import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

const TimelineTableRowDesktopSkeleton = () => (
  <TableRow className="!border-b !border-transparent">
    <TableCell className="border-none md:py-3">
      <Skeleton className="h-10 w-24" />
    </TableCell>
    <TableCell className="border-none md:py-3">
      <Skeleton className="h-10 w-48" />
    </TableCell>
    <TableCell className="border-none md:py-3">
      <Skeleton className="h-10 w-32" />
    </TableCell>
  </TableRow>
);

export default TimelineTableRowDesktopSkeleton;
