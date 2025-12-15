"use client";

import ButtonsDisplay from "./ButtonsDisplay";
import CreatedMomentAirdrop from "./CreatedMomentAirdrop";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

const CreatedStatus = () => {
  const { createdContract } = useMomentCreateProvider();
  return (
    <div className="h-fit w-full">
      <ButtonsDisplay />
      {createdContract && <CreatedMomentAirdrop />}
    </div>
  );
};

export default CreatedStatus;
