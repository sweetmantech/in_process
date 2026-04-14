import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PaymentsTableHeaderProps {
  counterpartyLabel?: string;
}

const PaymentsTableHeader = ({ counterpartyLabel = "Buyer" }: PaymentsTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{counterpartyLabel}</TableHead>
        <TableHead>Moment</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Time</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PaymentsTableHeader;
