import useCollection from "@/hooks/useCollection";
import { useMetadata } from "@/hooks/useMetadata";
import ContentRenderer from "../Token/ContentRenderer";
import { Fragment } from "react";
import truncateAddress from "@/lib/truncateAddress";
import { useTokensProvider } from "@/providers/TokensProvider";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Overview = () => {
  const { contractURI } = useCollection();
  const { collection } = useTokensProvider();
  const { data, isLoading } = useMetadata(contractURI);
  const { push } = useRouter();

  if (isLoading) return <Fragment />;
  if (data)
    return (
      <div className="pt-16">
        <div className="px-10 flex gap-2 font-archivo items-center cursor-pointer">
          <button
            type="button"
            onClick={() => push("/manage")}
            className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:bg-grey-moss-300"
          >
            Manage collections
          </button>
          <ArrowRight className="size-4" />
          {data.name}
        </div>
        <div className="w-full pt-4 px-10 flex flex-col md:flex-row items-center gap-2">
          <div className="min-w-[250px]">
            <ContentRenderer metadata={data} />
          </div>
          <div className="space-y-2">
            <p className="font-archivo text-xl">{data.name}</p>
            <p className="font-archivo bg-grey-moss-300 text-grey-moss-100 w-fit px-2 rounded-md">
              {truncateAddress(collection)}
            </p>
          </div>
        </div>
      </div>
    );
};

export default Overview;
