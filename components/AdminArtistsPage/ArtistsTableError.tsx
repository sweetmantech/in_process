import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArtistsTableErrorProps {
  error: Error;
}

const ArtistsTableError = ({ error }: ArtistsTableErrorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artists</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">Error loading artists: {error.message}</p>
      </CardContent>
    </Card>
  );
};

export default ArtistsTableError;
