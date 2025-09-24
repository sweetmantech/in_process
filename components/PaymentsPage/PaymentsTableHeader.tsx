import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PaymentsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Buyer</TableHead>
        <TableHead>Moment</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Time</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PaymentsTableHeader;
