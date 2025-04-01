import TokenPage from "@/components/TokenPage";
import { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  // eslint-disable-next-line
  const [_, address] = collection.split("%3A");
  const data = await fetch(
    `https://in-process-seven.vercel.app/api/token/metadata?collection=${address}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const title = "In Process";
  const description = data.metadata?.description || "Imagined by LATASHÁ";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        `https://in-process-seven.vercel.app/api/og/token?collection=${address}&tokenId=${tokenId}`,
      ],
    },
  };
}

const Token: NextPage = () => <TokenPage />;

export default Token;
