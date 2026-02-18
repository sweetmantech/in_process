"use client";

import { useEmails } from "@/hooks/useEmails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmailsTableLoading from "./EmailsTableLoading";
import EmailsTableError from "./EmailsTableError";
import NoEmailsFound from "./NoEmailsFound";
import EmailsTableContents from "./EmailsTableContents";
import FetchMore from "@/components/FetchMore";
import DownloadCsvButton from "./DownloadCsvButton";

const EmailsTable = () => {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useEmails();

  if (isPending) return <EmailsTableLoading />;
  if (error) return <EmailsTableError error={error} />;

  const emails = data?.pages.flatMap((p) => p.emails) ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Emails</span>
          <div className="flex items-center gap-2">
            <DownloadCsvButton emails={emails} hasNextPage={!!hasNextPage} />
            <Badge variant="outline">{emails.length} total</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {emails.length === 0 ? <NoEmailsFound /> : <EmailsTableContents emails={emails} />}
        {!isFetchingNextPage && hasNextPage && <FetchMore fetchMore={fetchNextPage} />}
        {isFetchingNextPage && (
          <div className="py-4 text-center text-sm text-neutral-500">Loading more...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailsTable;
