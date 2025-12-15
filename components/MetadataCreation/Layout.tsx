import CreateForm from "../CreateForm";
import CreateModeSelect from "../CreateModeSelect";
import MaskLines from "../CreateModeSelect/MaskLines";
import Preview from "./Preview";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MaskLines />
      <CreateModeSelect />
      <Preview>{children}</Preview>
      <CreateForm />
    </>
  );
};

export default Layout;
