import { TableCell } from "@/components/ui/table";
import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Skeleton } from "@/components/ui/skeleton";

interface MomentCellProps {
  token: {
    address: string;
    tokenId: number;
    uri: string;
  };
  className?: string;
}

const MomentCell = ({ token, className }: MomentCellProps) => {
  const tokenUrl = `https://inprocess.fun/collect/base:${token.address}/${token.tokenId || 1}`;
  const { data: metadata, isLoading } = useMetadata(token.uri);

  return (
    <TableCell className={className}>
      <a
        href={tokenUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:opacity-90"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
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
              {metadata?.name && (
                <span className="text-sm font-archivo-medium">{metadata.name}</span>
              )}
            </div>
          </>
        )}
      </a>
    </TableCell>
  );
};

export default MomentCell;
