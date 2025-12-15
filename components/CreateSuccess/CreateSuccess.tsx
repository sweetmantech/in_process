import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import CreatedMomentAirdrop from "./CreatedMomentAirdrop";
import MomentCreatedHeader from "./MomentCreatedHeader";
import MetadataCreation from "../MetadataCreation/MetadataCreation";
import Preview from "../MetadataCreation/Preview";

const CreateSuccess = () => {
  const { name } = useMetadataFormProvider();
  return (
    <>
      <div className="col-span-1 h-fit">
        <MomentCreatedHeader />
        <CreatedMomentAirdrop />
      </div>
      <Preview>
        <MetadataCreation />
      </Preview>
      <div className="col-span-1 w-full md:pl-12">
        <p className="text-center font-archivo-medium text-2xl md:text-left md:text-4xl">{name}</p>
        <p className="!m-0 text-center font-archivo md:text-left">{new Date().toLocaleString()}</p>
      </div>
    </>
  );
};

export default CreateSuccess;
