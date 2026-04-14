"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PaymentsTableLoading from "./PaymentsTableLoading";
import PaymentsTableError from "./PaymentsTableError";
import NoPaymentsFound from "./NoPaymentsFound";
import PaymentsTableContents from "./PaymentsTableContents";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsTable = () => {
  const { paymentsTab, payments, isPending, error, data } = usePaymentsProvider();

  if (error) return <PaymentsTableError error={error} />;
  if (isPending && !data) return <PaymentsTableLoading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{paymentsTab === "income" ? "Income" : "Outcome"}</span>
          <Badge variant="outline">{payments.length} transactions</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? <NoPaymentsFound /> : <PaymentsTableContents />}
      </CardContent>
    </Card>
  );
};

export default PaymentsTable;
