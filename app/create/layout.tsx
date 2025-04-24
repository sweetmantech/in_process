import CreateForm from "@/components/CreateForm";
import CreateModeSelect from "@/components/CreateModeSelect";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ZoraCreateProvider>
      <main className="w-screen grow">
        <div className="w-full pt-12 md:pt-24 grid grid-cols-3 gap-6 px-3 md:px-10">
          <CreateModeSelect />
          <div className="grow col-span-1 w-full flex justify-center">
            {children}
          </div>
          <CreateForm />
        </div>
      </main>
    </ZoraCreateProvider>
  );
};

export default RootLayout;
