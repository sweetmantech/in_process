import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TimelineMoment } from "@/types/moment";
import BlurImage from "@/components/BlurImage";

interface MomentCreationRowProps {
  moment: TimelineMoment;
}

const MomentCreationRow = ({ moment }: MomentCreationRowProps) => {
  const artist =
    moment.creator.username ||
    `${moment.creator.address.slice(0, 6)}...${moment.creator.address.slice(-4)}`;
  const contentType = moment.metadata?.content?.mime || "-";

  return (
    <TableRow>
      <TableCell>
        {moment.metadata?.image ? (
          <BlurImage
            src={moment.metadata.image}
            alt={moment.metadata.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded bg-neutral-100" />
        )}
      </TableCell>
      <TableCell className="font-medium">{moment.metadata?.name || "-"}</TableCell>
      <TableCell className="text-neutral-500">{artist}</TableCell>
      <TableCell className="text-neutral-500">
        {new Date(moment.created_at).toLocaleString()}
      </TableCell>
      <TableCell>
        <Badge variant="outline">{contentType}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default MomentCreationRow;
