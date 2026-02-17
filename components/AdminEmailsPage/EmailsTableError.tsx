import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailsTableErrorProps {
  error: Error;
}

const EmailsTableError = ({ error }: EmailsTableErrorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emails</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">Error loading emails: {error.message}</p>
      </CardContent>
    </Card>
  );
};

export default EmailsTableError;
