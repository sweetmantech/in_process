"server only";

import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import OgImage from "../OgImage";

const TokenImage = async ({ contractURI }: { contractURI: string }) => {
  const metadata = await fetch(getFetchableUrl(contractURI) || "").then((res) =>
    res.json(),
  );

  return (
    <OgImage
      src={getFetchableUrl(metadata.image) || ""}
      width={70}
      height={70}
      borderRadius={0}
    />
  );
};

export default TokenImage;
