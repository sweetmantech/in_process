import { TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import type { Payment } from "@/hooks/usePayments";
import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface PaymentsTableMomentCellProps {
  payment: Payment;
}

const PaymentsTableMomentCell = ({ payment }: PaymentsTableMomentCellProps) => {
  const tokenUrl = `https://inprocess.fun/collect/base:${payment.token.address}/${payment.token.tokenId}`;
  const { data: metadata } = useMetadata(payment.token.uri);

  return (
    <TableCell>
      <div className="flex items-center gap-3">
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
            {metadata?.name || `Token #${payment.token.tokenId}`}
          </span>
          <a
            href={tokenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {truncateAddress(payment.token.address)}
          </a>
        </div>
      </div>
    </TableCell>
  );
};

export default PaymentsTableMomentCell;
