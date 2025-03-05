import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Label } from "../ui/label";
import { useTokenProvider } from "@/providers/TokenProvider";
import CommentButton from "../CommentButton/CommentButton";
import { MouseEvent } from "react";

const CollectModal = () => {
  const { authenticated, login } = usePrivy();
  const {
    comment,
    handleCommentChange,
    isOpenCommentModal,
    setIsOpenCommentModal,
  } = useTokenProvider();

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
          className="w-full bg-black py-3 rounded-md h-fit text-tan-primary font-archivo"
        >
          Collect
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md !rounded-[0px] !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <Image
          src={"/sparkle.png"}
          width={44}
          height={44}
          alt="not found sparkle"
        />
        <p className="font-grotesk-medium text-2xl">
          collect sky piece for 0.001
        </p>
        <Label className="font-grotesk-medium text-lg text-left w-full mt-4">
          comment
        </Label>
        <textarea
          className="bg-tan-secondary w-full p-3 font-grotesk-light"
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
