"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateProvider";
import CreatedMoment from "../CreatedMoment/CreatedMoment";
import DesktopSelect from "./DesktopSelect";
import useIsMobile from "@/hooks/useIsMobile";
import { Fragment } from "react";
import MobileSelect from "./MobileSelect";

const CreateModeSelect = () => {
  const { createdContract } = useMomentCreateProvider();
  const isMobile = useIsMobile();

  return (
    <div className="col-span-1">
      {createdContract ? (
        <CreatedMoment />
      ) : (
        <Fragment>{isMobile ? <MobileSelect /> : <DesktopSelect />}</Fragment>
      )}
    </div>
  );
};

export default CreateModeSelect;
