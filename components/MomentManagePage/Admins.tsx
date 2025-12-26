"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import AddAdmin from "./AddAdmin";
import MomentAdmin from "./MomentAdmin";
import { Address } from "viem";

const Admins = () => {
  const { momentAdmins } = useMomentProvider();

  return (
    <div className="w-full font-archivo">
      <div className="mt-4 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-4 pt-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-archivo-medium text-lg">Current Admins</h3>
          {momentAdmins.length === 0 ? (
            <p className="font-spectral-italic text-sm text-grey-secondary">No admins added yet.</p>
          ) : (
            <div className="space-y-2">
              {momentAdmins.map((address: Address) => (
                <MomentAdmin key={address} address={address} />
              ))}
            </div>
          )}
        </div>

        <AddAdmin />
      </div>
    </div>
  );
};

export default Admins;
