"use client";

import Token from "@/components/Token";
import { TokenProvider } from "@/providers/TokenProvider";
import { ZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";
import { useParams } from "next/navigation";
import { Address } from "viem";

const TokenPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;
  // eslint-disable-next-line
  const [_, address] = collection.split("%3A");

  return (
    <main className="w-screen flex grow">
      <div className="w-full flex flex-col items-center justify-center pt-12 md:pt-24">
        <TokenProvider
          token={{
            tokenContractAddress: address as Address,
            tokenId,
          }}
        >
          <ZoraMintCommentProvider>
            <Token />
          </ZoraMintCommentProvider>
        </TokenProvider>
      </div>
    </main>
  );
};

export default TokenPage;
