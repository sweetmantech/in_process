"use client";

import ButtonsDisplay from "./ButtonsDisplay";
import CreatedMomentAirdrop from "./CreatedMomentAirdrop";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

const CreatedStatus = () => {
  const { createdTokenId } = useMomentCreateProvider();
  return (
    <div className="h-fit w-full">
      <ButtonsDisplay />
      {Boolean(createdTokenId) && <CreatedMomentAirdrop />}
    </div>
  );
};

export default CreatedStatus;
