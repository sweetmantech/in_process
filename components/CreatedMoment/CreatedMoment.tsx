"use client";

import Image from "next/image";
import Buttons from "./Buttons";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { TokenProvider } from "@/providers/TokenProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/TokenManagePage/Airdrop";
import { CHAIN_ID } from "@/lib/consts";
import { Address } from "viem";

const CreatedMoment = () => {
  const { createdContract, createdTokenId } = useMomentCreateProvider();

  if (!createdContract || !createdTokenId) {
    return (
      <div className="w-full h-fit">
        <div className="flex items-end gap-3 w-full w-fit">
          <div className="w-full relative">
            <p className="font-archivo-medium text-2xl md:text-4xl xl:text-5xl">moment created</p>
            <div className="block md:hidden absolute w-1/2 aspect-[1/1] right-10 -bottom-[calc(100%+50px)]">
              <Image
                src="/semi-transparent.png"
                alt="not found semi"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="hidden md:block">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-fit">
      <div className="flex items-end gap-3 w-full w-fit">
        <div className="w-full relative">
          <p className="font-archivo-medium text-2xl md:text-4xl xl:text-5xl">moment created</p>
          <div className="block md:hidden absolute w-1/2 aspect-[1/1] right-10 -bottom-[calc(100%+50px)]">
            <Image
              src="/semi-transparent.png"
              alt="not found semi"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="hidden md:block">
            <Buttons />
          </div>
        </div>
      </div>
      <TokenProvider
        token={{
          tokenContractAddress: createdContract as Address,
          tokenId: createdTokenId,
        }}
        chainId={CHAIN_ID}
      >
        <CollectionProvider
          collection={{
            address: createdContract as Address,
            chainId: CHAIN_ID,
          }}
        >
          <AirdropProvider>
            <Airdrop />
          </AirdropProvider>
        </CollectionProvider>
      </TokenProvider>
    </div>
  );
};

export default CreatedMoment;
