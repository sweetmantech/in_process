import TokenPage from "@/components/TokenPage";
import { VERCEL_OG } from "@/lib/consts";
import { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  // eslint-disable-next-line
  const [_, address] = collection.split("%3A");
  const data = await fetch(
    `${VERCEL_OG}/api/token/metadata?collection=${address}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const title = data.metadata?.name || "In Process";
  const description = data.metadata?.description || "Imagined by LATASHÁ";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        `${VERCEL_OG}/api/og/token?collection=${address}&tokenId=${tokenId}`,
      ],
    },
  };
}

const Token: NextPage = () => <TokenPage />;

export default Token;
