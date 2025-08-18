import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import { TableRow, TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import { getShortNetworkNameFromChainId } from "@/lib/zora/zoraToViem";

const fontFamilies = ["font-archivo", "font-spectral-italic", "font-archivo"];
const fontSizes = [
  "text-sm md:text-xl",
  "text-sm md:text-lg",
  "text-sm md:text-md",
];

const TimelineTableRowDesktop = ({ moment }: { moment: any }) => {
  const { data } = useMetadata(moment.uri);
  const { push } = useRouter();

  const handleClick = () => {
    const shortNetworkName = getShortNetworkNameFromChainId(moment.chainId);
    if (shortNetworkName) {
      const tokenId = moment.tokenId === "0" ? "1" : moment.tokenId;
      push(`/collect/${shortNetworkName}:${moment.address}/${tokenId}`);
    }
  };

  return (
    <TableRow
      className="!border-b !border-transparent hover:!bg-transparent hover:!text-grey-moss-300 hover:!border-b-grey-moss-300"
      onClick={handleClick}
    >
      <TableCell
        className={`md:py-3 border-none cursor-pointer ${fontFamilies[0]} ${fontSizes[0]}`}
      >
        <p className="font-archivo-medium">
          {moment.username || truncateAddress(moment.address)}
        </p>
      </TableCell>
      <TableCell
        className={`md:py-3 border-none cursor-pointer ${fontFamilies[1]} ${fontSizes[1]}`}
      >
        <p className="font-spectral-italic">
          {data?.name
            ? `${data.name.slice(0, 60)}${data.name.length > 60 ? "..." : ""}`
            : ""}
        </p>
      </TableCell>
      <TableCell
        className={`md:py-3 border-none cursor-pointer ${fontFamilies[2]} ${fontSizes[2]}`}
      >
        {new Date(moment.createdAt).toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default TimelineTableRowDesktop;
