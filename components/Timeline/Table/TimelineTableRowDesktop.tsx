import { useMetadata } from "@/hooks/useMetadata";
import { TableRow, TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import { type TimelineMoment } from "@/types/moment";
import { useMomentNavigation } from "@/hooks/useMomentNavigation";

const fontFamilies = ["font-archivo", "font-spectral-italic", "font-archivo"];
const fontSizes = ["text-sm md:text-xl", "text-sm md:text-lg", "text-sm md:text-md"];

const TimelineTableRowDesktop = ({ moment }: { moment: TimelineMoment }) => {
  const { data } = useMetadata(moment.uri);
  const { handleMomentClick } = useMomentNavigation(moment);

  return (
    <TableRow
      className="!border-b !border-transparent hover:!border-b-grey-moss-300 hover:!bg-transparent hover:!text-grey-moss-300"
      onClick={handleMomentClick}
    >
      <TableCell
        className={`cursor-pointer border-none md:py-3 ${fontFamilies[0]} ${fontSizes[0]}`}
      >
        <p className="font-archivo-medium">
          {moment.default_admin.username || truncateAddress(moment.default_admin.address)}
        </p>
      </TableCell>
      <TableCell
        className={`cursor-pointer border-none md:py-3 ${fontFamilies[1]} ${fontSizes[1]}`}
      >
        <p className="font-spectral-italic">
          {data?.name ? `${data.name.slice(0, 60)}${data.name.length > 60 ? "..." : ""}` : ""}
        </p>
      </TableCell>
      <TableCell
        className={`cursor-pointer border-none md:py-3 ${fontFamilies[2]} ${fontSizes[2]}`}
      >
        {new Date(moment.created_at).toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default TimelineTableRowDesktop;
