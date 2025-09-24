import { TableCell } from "@/components/ui/table";
import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface MomentCellProps {
  token: {
    address: string;
    tokenId: number;
    uri: string;
  };
  className?: string;
}

const MomentCell = ({ token, className }: MomentCellProps) => {
  const tokenUrl = `https://inprocess.fun/collect/base:${token.address}/${token.tokenId}`;
  const { data: metadata } = useMetadata(token.uri);

  return (
    <TableCell className={className}>
      <a
        href={tokenUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:opacity-90"
      >
        {metadata?.image && (
          <Image
            src={getFetchableUrl(metadata.image) || ""}
            alt={metadata.name || "Moment"}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-archivo-medium">
            {metadata?.name || `Token #${token.tokenId}`}
          </span>
        </div>
      </a>
    </TableCell>
  );
};

export default MomentCell;
