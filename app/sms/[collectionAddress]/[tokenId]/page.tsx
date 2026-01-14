import { VERCEL_OG } from "@/lib/og/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { CHAIN_ID } from "@/lib/consts";
import { getMomentAdvancedInfo } from "@/lib/moment/getMomentAdvancedInfo";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { isAddress } from "viem";
import SMSMomentPage from "@/components/SMSMomentPage";

type Props = {
  params: Promise<{ collectionAddress: string; tokenId: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collectionAddress } = await params;
  const { address, chainId } = parseCollectionAddress(collectionAddress);
  if (!address || !isAddress(address)) throw new Error("Collection address is required");
  if (!tokenId) throw new Error("Token ID is required");

  const moment = {
    collectionAddress: address,
    tokenId,
    chainId: chainId || CHAIN_ID,
  };
  const { uri } = await getMomentAdvancedInfo(moment);
  if (!uri) throw Error("failed to get moment uri");
  const metadata = await fetchTokenMetadata(uri);

  const title = metadata?.name || "In Process";
  const description = metadata?.description || "Imagined by LATASHÁ";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        `${VERCEL_OG}/api/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}&chainId=${moment.chainId}`,
      ],
    },
  };
}

const SMSMoment: NextPage = () => <SMSMomentPage />;

export default SMSMoment;
