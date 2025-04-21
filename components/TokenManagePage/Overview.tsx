import { useMetadata } from "@/hooks/useMetadata";
import ContentRenderer from "../Token/ContentRenderer";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Address } from "abitype";
import useToken from "@/hooks/useToken";
import { useTokensProvider } from "@/providers/TokensProvider";

const Overview = () => {
  const { collectionURI, collection, chainId } = useTokensProvider();
  const params = useParams();
  const tokenId = params.tokenId as Address;
  const { tokenUri } = useToken(collection as Address, tokenId, chainId);
  const { data: tMetadata, isLoading: tLoading } = useMetadata(tokenUri);
  const { data: cMetadata, isLoading: cLoading } = useMetadata(collectionURI);
  const { push } = useRouter();

  if (tLoading || cLoading) return <Fragment />;
  if (tMetadata && cMetadata)
    return (
      <div className="pt-10 md:pt-16 px-4 md:px-10">
        <div className="flex gap-1 md:gap-2 text-sm font-archivo items-center cursor-pointer">
          <button
            type="button"
            onClick={() => push("/manage")}
            className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:bg-grey-moss-300"
          >
            Manage collections
          </button>
          <ArrowRight className="size-4" />
          <button
            type="button"
            onClick={() =>
              push(
                `/manage/${decodeURIComponent(params.collectionAddress as string)}`,
              )
            }
            className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:bg-grey-moss-300"
          >
            {cMetadata.name}
          </button>
          <ArrowRight className="size-4" />
          {tMetadata.name}
        </div>
        <div className="w-full pt-4 flex flex-col md:flex-row items-center gap-2">
          <div className="w-full md:w-fit md:min-w-[200px] aspect-[1/1] relative">
            <ContentRenderer metadata={tMetadata} />
          </div>
          <div className="space-y-2">
            <p className="font-archivo text-xl md:text-4xl">{tMetadata.name}</p>
          </div>
        </div>
      </div>
    );
};

export default Overview;
