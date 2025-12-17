"use client";

import DesktopSelect from "./DesktopSelect";
import useIsMobile from "@/hooks/useIsMobile";
import MobileSelect from "./MobileSelect";

const CreateModeSelect = () => {
  const isMobile = useIsMobile();

  return <div className="col-span-1">{isMobile ? <MobileSelect /> : <DesktopSelect />}</div>;
};

export default CreateModeSelect;
