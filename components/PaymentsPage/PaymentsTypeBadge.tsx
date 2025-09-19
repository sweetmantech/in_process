import { Badge } from "@/components/ui/badge";

interface PaymentsTypeBadgeProps {
  type: "earning" | "expense";
}

const PaymentsTypeBadge = ({ type }: PaymentsTypeBadgeProps) => {
  const isEarning = type === "earning";

  return (
    <Badge
      variant={isEarning ? "default" : "secondary"}
      className={`text-xs ${
        isEarning
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      }`}
    >
      {isEarning ? "Earning" : "Expense"}
    </Badge>
  );
};

export default PaymentsTypeBadge;
