import { useMetadata } from "@/hooks/useMetadata";
import ContentRenderer from "../Token/ContentRenderer";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTokensProvider } from "@/providers/TokensProvider";
import { useTokenProvider } from "@/providers/TokenProvider";

const Overview = () => {
  const { collectionURI } = useTokensProvider();
  const { data: cMetadata, isLoading: cLoading } = useMetadata(collectionURI);
  const { push } = useRouter();
  const { metadata, token } = useTokenProvider();
  const { data: meta, isLoading } = metadata;

  if (isLoading && cLoading) return <Fragment />;
  if (meta && cMetadata)
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
                `/manage/${decodeURIComponent(token.tokenContractAddress as string)}`,
              )
            }
            className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:bg-grey-moss-300"
          >
            {cMetadata.name}
          </button>
          <ArrowRight className="size-4" />
          {meta.name}
        </div>
        <div className="w-full pt-4 flex flex-col md:flex-row items-center gap-2">
          <div className="w-full md:w-fit md:min-w-[200px] aspect-[1/1] relative">
            <ContentRenderer metadata={meta} />
          </div>
          <div className="space-y-2">
            <p className="font-archivo text-xl md:text-4xl">{meta.name}</p>
          </div>
        </div>
      </div>
    );
};

export default Overview;
