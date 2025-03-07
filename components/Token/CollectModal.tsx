import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Label } from "../ui/label";
import { useTokenProvider } from "@/providers/TokenProvider";
import CommentButton from "../CommentButton/CommentButton";
import { MouseEvent } from "react";
import { Skeleton } from "../ui/skeleton";
import { formatEther } from "viem";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CollectModal = () => {
  const { authenticated, login } = usePrivy();
  const {
    comment,
    handleCommentChange,
    isOpenCommentModal,
    setIsOpenCommentModal,
    saleConfig,
    metadata,
  } = useTokenProvider();
  const { data, isLoading } = saleConfig;
  const { data: meta } = metadata;

  const handleCollect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!authenticated) {
      login();
      return;
    }
    setIsOpenCommentModal(true);
    return;
  };

  return (
    <Dialog
      open={isOpenCommentModal}
      onOpenChange={() => setIsOpenCommentModal(!isOpenCommentModal)}
    >
      <DialogTrigger asChild onClick={handleCollect}>
        <button
          type="button"
          className="w-full bg-black py-3 rounded-md h-fit text-tan-primary font-archivo text-2xl"
        >
          Collect
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl !rounded-[0px] !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Collect</DialogTitle>
        </VisuallyHidden>
        <Image
          src={"/sparkle.png"}
          width={44}
          height={44}
          alt="not found sparkle"
        />
        <section className="font-archivo-medium text-xl pt-2 flex items-center gap-2">
          collect {meta?.name || ""} for{" "}
          {isLoading ? (
            <Skeleton className="h-5 w-10 rounded-none" />
          ) : (
            <>{formatEther(BigInt(data?.pricePerToken || 0))} eth</>
          )}
        </section>
        <Label className="font-archivo text-lg text-left w-full mt-4">
          comment
        </Label>
        <textarea
          className="bg-tan-secondary w-full p-3 font-grotesk-light !border-none !outline-none !ring-0"
          rows={6}
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="w-full mt-4">
          <CommentButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectModal;
