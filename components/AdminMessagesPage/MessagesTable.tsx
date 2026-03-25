"use client";

import { useMessages } from "@/hooks/useMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MessagesTableLoading from "./MessagesTableLoading";
import MessagesTableError from "./MessagesTableError";
import NoMessagesFound from "./NoMessagesFound";
import MessagesTableContents from "./MessagesTableContents";
import MessagesPagination from "./MessagesPagination";

interface MessagesTableProps {
  limit?: number;
}

const MessagesTable = ({ limit = 10 }: MessagesTableProps) => {
  const { data, isLoading, error, currentPage, setCurrentPage } = useMessages({ limit });

  if (isLoading) return <MessagesTableLoading />;
  if (error) return <MessagesTableError error={error} />;

  const messages = data?.messages || [];
  const count = data?.count || 0;
  const totalPages = Math.ceil(count / limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Messages</span>
          <Badge variant="outline">{count} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <NoMessagesFound />
        ) : (
          <>
            <MessagesTableContents messages={messages} />
            {totalPages > 1 && (
              <MessagesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesTable;
