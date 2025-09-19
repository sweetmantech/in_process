import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import truncateAddress from "@/lib/truncateAddress";
import type { Payment } from "@/hooks/usePayments";
import { useBlock } from "@/hooks/useBlock";
import PaymentsTableMomentCell from "./PaymentsTableMomentCell";

interface PaymentRowProps {
  payment: Payment;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const txUrl = `https://basescan.org/tx/${payment.hash}`;
  const { data: blockTime } = useBlock(payment.block, payment.token.chainId);

  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span className="text-sm font-archivo-medium">
            {payment.buyer.username || truncateAddress(payment.buyer.address)}
          </span>
          <span className="text-xs text-neutral-500">
            {truncateAddress(payment.buyer.address)}
          </span>
        </div>
      </TableCell>

      <PaymentsTableMomentCell payment={payment} />

      <TableCell>
        <Badge variant="secondary" className="font-mono">
          ${payment.amount}
        </Badge>
      </TableCell>

      <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex flex-col">
          <span>
            {blockTime ? blockTime.toLocaleString() : `Block #${payment.block}`}
          </span>
          <span className="text-xs text-neutral-500">
            Block #{payment.block}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <a
          href={txUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-mono"
        >
          {truncateAddress(payment.hash)}
        </a>
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
