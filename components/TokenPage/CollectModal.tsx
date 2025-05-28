import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { useTokenProvider } from "@/providers/TokenProvider";
import CommentButton from "../CommentButton/CommentButton";
import { Fragment, MouseEvent, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import dynamic from "next/dynamic";
import { useZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import truncated from "@/lib/truncated";
import Advanced from "./Advanced";

const CrossmintModal = dynamic(
  () => import("../CommentButton/CrossmintModal"),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white p-6 rounded-lg font-archivo">
          Loading payment options...
        </div>
      </div>
    ),
    ssr: false,
  },
);

const CollectModal = () => {
  const {
    comment,
    handleCommentChange,
    isOpenCommentModal,
    setIsOpenCommentModal,
    saleConfig,
    metadata,
    setComment,
    isLoading,
    isSetSale,
    mintCount,
  } = useTokenProvider();
  const { data: meta } = metadata;
  const { setIsOpenCrossmint, isOpenCrossmint } = useZoraMintCommentProvider();
  const { isPrepared } = useUserProvider();
  const isSaleActive =
    parseInt(BigInt(saleConfig?.saleStart?.toString() || 0).toString(), 10) *
      1000 <
    Date.now();

  const handleCollect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setIsOpenCommentModal(true);
    return;
  };

  if (!isSetSale || !saleConfig) return <Fragment />;

  return (
    <>
      <Dialog
        open={isOpenCommentModal}
        onOpenChange={() => setIsOpenCommentModal(!isOpenCommentModal)}
      >
        <DialogTrigger
          asChild
          onClick={handleCollect}
          disabled={!isSaleActive}
          className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
        >
          <button
            type="button"
            className="w-full md:w-[420px] py-2 md:h-[60px] bg-black hover:bg-grey-moss-300 rounded-md h-fit text-grey-eggshell font-archivo text-2xl"
          >
            collect
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
          <VisuallyHidden>
            <DialogTitle>Collect</DialogTitle>
          </VisuallyHidden>
          <section className="font-archivo-medium text-xl pt-2 flex items-center gap-2">
            collect {truncated(meta?.name || "")} for{" "}
            {isLoading ? (
              <Skeleton className="h-5 w-10 rounded-none" />
            ) : (
              <>
                {saleConfig.pricePerToken === BigInt(0)
                  ? "free"
                  : `${getPrice(saleConfig.pricePerToken * BigInt(mintCount), saleConfig.type)} ${getPriceUnit(saleConfig.type)}`}
              </>
            )}
          </section>
          <Label className="font-archivo text-lg text-left w-full mt-4">
            comment
          </Label>
          <textarea
            className="bg-grey-moss-50 w-full p-3 font-spectral !border-none !outline-none !ring-0"
            rows={6}
            value={comment}
            onChange={handleCommentChange}
          />
          <Advanced />
          <div className="w-full mt-4">
            <CommentButton />
          </div>
        </DialogContent>
      </Dialog>
      {isOpenCrossmint && (
        <Suspense fallback={<div>Loading...</div>}>
          <CrossmintModal
            onClose={() => {
              setIsOpenCrossmint(false);
              setComment("");
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default CollectModal;
