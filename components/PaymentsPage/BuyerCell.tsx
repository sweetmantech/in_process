import { TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import type { Payment, PaymentWithType } from "@/types/payments";
import PaymentsTypeBadge from "./PaymentsTypeBadge";
import { usePaymentType } from "@/hooks/usePaymentType";

interface BuyerCellProps {
  payment: Payment | PaymentWithType;
}

const BuyerCell = ({ payment }: BuyerCellProps) => {
  const { isExpense } = usePaymentType(payment);

  const buyerUsername = payment.buyer.username;
  const buyerAddress = payment.buyer.address;
  const sellerAddress = payment.moment.collection.default_admin;

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
