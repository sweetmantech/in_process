import TokenPage from "@/components/TokenPage";
import { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;

  return {
    title: "In Process",
    description: "Imagined by LATASHÁ",
    openGraph: {
      title: "In Process",
      description: "Imagined by LATASHÁ",
      images: [
        `https://in-process-seven.vercel.app/api/og/token?collection=${collection}&tokenId=${tokenId}`,
      ],
    },
  };
}

const Token: NextPage = () => <TokenPage />;

export default Token;
