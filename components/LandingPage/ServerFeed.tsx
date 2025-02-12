import { getLatestFeed } from "@/lib/dune/getLatestFeed";
import ClientFeed from "./ClientFeed";

export default async function ServerFeed() {
  const initialData = await getLatestFeed();
  
  return <ClientFeed initialData={initialData} />;
}