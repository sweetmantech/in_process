import CreateForm from "@/components/CreateForm";
import CreateModeSelect from "@/components/CreateModeSelect";
import MaskLines from "@/components/CreateModeSelect/MaskLines";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ZoraCreateProvider>
      <main className="w-screen grow">
        <div className="relative w-full mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-3 md:px-10">
          <MaskLines />
          <CreateModeSelect />
          <div className="w-full aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
            {children}
          </div>
          <CreateForm />
        </div>
      </main>
    </ZoraCreateProvider>
  );
};

export default RootLayout;
