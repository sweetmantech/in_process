import { Fragment, ReactNode } from "react";
import { Label } from "../ui/label";

interface PreviewContainerProps {
  children: ReactNode;
}

export const PreviewContainer = ({ children }: PreviewContainerProps) => {
  return (
    <Fragment>
      <Label>preview</Label>
      <section className="mt-1 aspect-video border border-grey relative overflow-hidden cursor-pointer font-spectral">
        {children}
      </section>
    </Fragment>
  );
}; 