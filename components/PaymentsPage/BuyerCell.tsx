"use client";

import { TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import type { PaymentTransferRow } from "@/types/payments";
import PaymentsTypeBadge from "./PaymentsTypeBadge";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

interface BuyerCellProps {
  payment: PaymentTransferRow;
}

const BuyerCell = ({ payment }: BuyerCellProps) => {
  const { isExpense } = usePaymentsProvider();

  const buyerUsername = payment.collector.username;
  const buyerAddress = payment.collector.address;
  const sellerAddress = payment.moment.collection.artist?.address;

  const buyerDisplayName = buyerUsername || truncateAddress(buyerAddress);
  const sellerDisplayName = sellerAddress ? truncateAddress(sellerAddress) : "Unknown";

  return (
    <TableCell className="font-medium">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <PaymentsTypeBadge type={isExpense ? "earning" : "expense"} />
          <span className="font-archivo-medium text-sm">
            {isExpense ? buyerDisplayName : sellerDisplayName}
          </span>
        </div>
      </div>
    </TableCell>
  );
};

export default BuyerCell;
