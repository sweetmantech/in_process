import { Fragment } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import Description from "./Description";
import Title from "./Title";

const TitleAndDescription = () => {
  const { metadata } = useMomentProvider();

  if (!metadata) return <Fragment />;

  return (
    <>
      <Title />
      <Description />
    </>
  );
};

export default TitleAndDescription;
