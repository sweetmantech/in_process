import { TokenMetadata } from "@/types/token";
import OgImage from "../OgImage";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import React from "react";
import { VERCEL_OG } from "@/lib/consts";

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
        paddingBottom: 180,
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
                data.image || `${VERCEL_OG}/images/placeholder.png`,
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
        src={`${VERCEL_OG}/favicon_grey.png`}
        width={50}
        height={50}
        borderRadius={25}
      />
    </div>
  );
};

export default OgHeader;
