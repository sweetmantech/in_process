import { TokenMetadata } from "@/types/token";
import OgImage from "../OgImage";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import React from "react";

interface OgHeaderProps {
  avatar: string;
  metadata: TokenMetadata[];
}
const OgHeader = ({ avatar, metadata }: OgHeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 32,
      }}
    >
      <OgImage src={avatar} width={80} height={80} borderRadius={40} />
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        {metadata.map((data: TokenMetadata, index: number) => (
          <OgImage
            src={
              getFetchableUrl(
                data.image ||
                  `https://in-process-seven.vercel.app/images/placeholder.png`,
              ) || ""
            }
            width={70}
            height={70}
            borderRadius={0}
            key={index}
          />
        ))}
      </div>
      <OgImage
        src="https://arweave.net/LrL9js9l9tT-6S06N1MtE02nCMX5gmVzGUbEVjTplo0"
        width={50}
        height={50}
        borderRadius={25}
      />
    </div>
  );
};

export default OgHeader;
