import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

const PaymentsTableLoading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsTableLoading;
