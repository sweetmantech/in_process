"use client";

import { useEmails } from "@/hooks/useEmails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmailsTableLoading from "./EmailsTableLoading";
import EmailsTableError from "./EmailsTableError";
import NoEmailsFound from "./NoEmailsFound";
import EmailsTableContents from "./EmailsTableContents";
import FetchMore from "@/components/FetchMore";
import { Download } from "lucide-react";
import { downloadEmailsCsv } from "@/lib/admin/downloadEmailsCsv";

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
            <div className="flex flex-col items-end gap-0.5">
              <button
                type="button"
                onClick={() => downloadEmailsCsv(emails)}
                disabled={!!hasNextPage}
                className="flex items-center gap-1.5 rounded-sm border border-grey-moss-900 bg-grey-moss-100 px-3 py-1.5 font-archivo text-sm text-grey-moss-900 hover:bg-grey-moss-300 hover:text-grey-eggshell disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download className="size-3.5" />
                Download CSV
              </button>
              {hasNextPage && (
                <span className="font-archivo text-xs text-grey-secondary">
                  scroll to load all rows first
                </span>
              )}
            </div>
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
