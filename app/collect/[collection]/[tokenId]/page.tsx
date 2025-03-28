import TokenPage from "@/components/TokenPage";
import getTokenURI from "@/lib/zora/getTokenURI";
import { Address } from "viem";
import { Metadata, NextPage } from "next";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  // eslint-disable-next-line
  const [_, address] = collection.split("%3A");
  const uri = await getTokenURI(address as Address, parseInt(tokenId, 10));
  const metadata = await fetch(`${getFetchableUrl(uri as string)}`).then(
    (res) => res.json(),
  );

  const title = "In Process";
  const description = metadata.description || "Imagined by LATASHÁ";

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
