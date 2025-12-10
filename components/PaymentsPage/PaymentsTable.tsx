"use client";

import { usePayments } from "@/hooks/usePayments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PaymentsTableLoading from "./PaymentsTableLoading";
import PaymentsTableError from "./PaymentsTableError";
import NoPaymentsFound from "./NoPaymentsFound";
import PaymentsTableContents from "./PaymentsTableContents";

interface PaymentsTableProps {
  limit?: number;
  address?: string;
  combined?: boolean;
}

const PaymentsTable = ({ limit = 20, address, combined = false }: PaymentsTableProps) => {
  const { data, isLoading, error, fetchMore, hasNextPage } = usePayments({
    page: 1,
    limit,
    artist: address,
    collector: combined ? address : undefined,
  });

  if (isLoading) return <PaymentsTableLoading />;
  if (error) return <PaymentsTableError error={error} />;

  const payments = data?.payments || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payments</span>
          <Badge variant="outline">{payments.length} transactions</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <NoPaymentsFound />
        ) : (
          <PaymentsTableContents
            payments={payments}
            fetchMore={fetchMore}
            hasNextPage={hasNextPage}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentsTable;
