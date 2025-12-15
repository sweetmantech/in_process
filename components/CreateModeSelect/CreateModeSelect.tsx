"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import CreatedStatus from "../CreatedStatus";
import DesktopSelect from "./DesktopSelect";
import useIsMobile from "@/hooks/useIsMobile";
import { Fragment } from "react";
import MobileSelect from "./MobileSelect";

const CreateModeSelect = () => {
  const { createdTokenId } = useMomentCreateProvider();
  const isMobile = useIsMobile();

  return (
    <div className="col-span-1">
      {Boolean(createdTokenId) ? (
        <CreatedStatus />
      ) : (
        <Fragment>{isMobile ? <MobileSelect /> : <DesktopSelect />}</Fragment>
      )}
    </div>
  );
};

export default CreateModeSelect;
