import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import CommentButton from "../CommentButton/CommentButton";
import { Fragment, MouseEvent } from "react";
import { Skeleton } from "../ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { useUserProvider } from "@/providers/UserProvider";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import truncated from "@/lib/truncated";
import Advanced from "./Advanced";
import { MomentType } from "@/types/moment";

const CollectModal = () => {
  const { comment, isOpenCommentModal, setIsOpenCommentModal, setComment } =
    useMomentCommentsProvider();
  const { saleConfig, isLoading, metadata, isSoldOut, isSaleActive } = useMomentProvider();

  const { amountToCollect } = useMomentCollectProvider();
  const { isPrepared } = useUserProvider();

  const handleCollect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setIsOpenCommentModal(true);
    return;
  };

  if (isLoading || !metadata || !saleConfig) return <Fragment />;

  return (
    <>
      <Dialog
        open={isOpenCommentModal}
        onOpenChange={() => setIsOpenCommentModal(!isOpenCommentModal)}
      >
        <DialogTrigger
          asChild
          onClick={handleCollect}
          disabled={!isSaleActive || isSoldOut}
          className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
        >
          <button
            type="button"
            className="h-fit w-full rounded-md bg-black py-2 font-archivo text-2xl text-grey-eggshell hover:bg-grey-moss-300 md:h-[60px] md:w-[420px]"
          >
            {isSoldOut ? "sold out" : "collect"}
          </button>
        </DialogTrigger>
        <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
          <VisuallyHidden>
            <DialogTitle>Collect</DialogTitle>
          </VisuallyHidden>
          <section className="flex items-center gap-2 pt-2 font-archivo-medium text-xl">
            collect {truncated(metadata?.name || "")} for{" "}
            {isLoading ? (
              <Skeleton className="h-5 w-10 rounded-none" />
            ) : (
              <>
                {BigInt(saleConfig?.pricePerToken || 0) === BigInt(0)
                  ? "free"
                  : `${getPrice(BigInt(saleConfig?.pricePerToken || 0) * BigInt(amountToCollect), saleConfig?.type || MomentType.FixedPriceMint)} ${getPriceUnit(saleConfig?.type || MomentType.FixedPriceMint)}`}
              </>
            )}
          </section>
          <Label className="mt-4 w-full text-left font-archivo text-lg">comment</Label>
          <textarea
            className="w-full !border-none bg-grey-moss-50 p-3 font-spectral !outline-none !ring-0"
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Advanced />
          <div className="mt-4 w-full">
            <CommentButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectModal;
