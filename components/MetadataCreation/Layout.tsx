import CreateForm from "../CreateForm";
import CreateModeSelect from "../CreateModeSelect";
import MaskLines from "../CreateModeSelect/MaskLines";
import Moment from "../Moment";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MaskLines />
      <CreateModeSelect />
      <Moment>{children}</Moment>
      <CreateForm />
    </>
  );
};

export default Layout;
