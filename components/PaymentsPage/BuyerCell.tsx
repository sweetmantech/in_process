import { TableCell } from "@/components/ui/table";
import truncateAddress from "@/lib/truncateAddress";
import type { Payment, PaymentWithType } from "@/hooks/usePayments";
import PaymentsTypeBadge from "./PaymentsTypeBadge";

interface BuyerCellProps {
  payment: Payment | PaymentWithType;
}

const BuyerCell = ({ payment }: BuyerCellProps) => {
  const isCombinedPayment = "type" in payment;
  const isEarning = isCombinedPayment && payment.type === "earning";

  const buyerUsername = payment.buyer.username;
  const buyerAddress = payment.buyer.address;
  const sellerAddress = payment.token.defaultAdmin;

  const buyerDisplayName = buyerUsername || truncateAddress(buyerAddress);
  const sellerDisplayName = sellerAddress
    ? truncateAddress(sellerAddress)
    : "Unknown";

  return (
    <TableCell className="font-medium">
      <div className="flex flex-col">
        {isCombinedPayment ? (
          <div className="flex items-center gap-2">
            <PaymentsTypeBadge type={payment.type} />
            <span className="text-sm font-archivo-medium">
              {isEarning ? buyerDisplayName : sellerDisplayName}
            </span>
          </div>
        ) : (
          <span className="text-sm font-archivo-medium">
            {buyerDisplayName}
          </span>
        )}
      </div>
    </TableCell>
  );
};

export default BuyerCell;
