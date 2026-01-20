import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import { Fragment } from "react";

const Warning = () => {
  const hasWarning = useMomentLegacyWarning();

  if (!hasWarning) return <Fragment />;

  return (
    <p className="mb-4 text-sm text-amber-600">
      In•Process smart wallet does not have the permission to manage this legacy moment.
    </p>
  );
};

export default Warning;
