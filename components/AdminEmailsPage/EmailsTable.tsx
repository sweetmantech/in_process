"use client";

import { useRef, useEffect } from "react";
import { useEmails } from "@/hooks/useEmails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmailsTableLoading from "./EmailsTableLoading";
import EmailsTableError from "./EmailsTableError";
import NoEmailsFound from "./NoEmailsFound";
import EmailsTableContents from "./EmailsTableContents";

const EmailsTable = () => {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useEmails();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <EmailsTableLoading />;
  if (error) return <EmailsTableError error={error} />;

  const emails = data?.pages.flatMap((p) => p.emails) ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Emails</span>
          <Badge variant="outline">{emails.length} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {emails.length === 0 ? <NoEmailsFound /> : <EmailsTableContents emails={emails} />}
        <div ref={sentinelRef} className="h-4" />
        {isFetchingNextPage && (
          <div className="py-4 text-center text-sm text-neutral-500">Loading more...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailsTable;
