import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TimelineMoment } from "@/types/moment";
import MomentCreationRow from "./MomentCreationRow";

interface MomentCreationsTableContentsProps {
  moments: TimelineMoment[];
}

const MomentCreationsTableContents = ({ moments }: MomentCreationsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[700px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-14">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-36">Artist</TableHead>
            <TableHead className="w-44">Date Created</TableHead>
            <TableHead className="w-28">Content Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moments.map((moment) => (
            <MomentCreationRow key={moment.id} moment={moment} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MomentCreationsTableContents;
