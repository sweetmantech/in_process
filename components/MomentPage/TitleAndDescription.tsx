import { Fragment } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import Description from "./Description";

const TitleAndDescription = () => {
  const { metadata } = useMomentProvider();

  if (!metadata) return <Fragment />;

  return (
    <>
      <h3 className="font-spectral text-3xl md:text-4xl">
        {metadata.name.length > 100 ? `${metadata.name.slice(0, 100)}...` : metadata.name}
      </h3>
      <Description description={metadata.description || ""} />
    </>
  );
};

export default TitleAndDescription;
