import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MessagesTableErrorProps {
  error: Error;
}

const MessagesTableError = ({ error }: MessagesTableErrorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">Error loading messages: {error.message}</p>
      </CardContent>
    </Card>
  );
};

export default MessagesTableError;
