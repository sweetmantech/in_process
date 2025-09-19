import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentsTableErrorProps {
  error: Error;
}

const PaymentsTableError = ({ error }: PaymentsTableErrorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            Failed to load payments: {error.message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsTableError;
