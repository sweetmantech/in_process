"use client";

import { useMomentAdminsProvider } from "@/providers/MomentAdminsProvider";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import truncateAddress from "@/lib/truncateAddress";
import AddAdmin from "./AddAdmin";

const Admins = () => {
  const { admins, handleRemoveAdmin } = useMomentAdminsProvider();

  return (
    <div className="w-full font-archivo">
      <div className="mt-4 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-4 pt-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-archivo-medium text-lg">Current Admins</h3>
          {admins.length === 0 ? (
            <p className="font-spectral-italic text-sm text-grey-secondary">No admins added yet.</p>
          ) : (
            <div className="space-y-2">
              {admins.map((address: string) => (
                <div
                  key={address}
                  className="flex items-center justify-between rounded-lg border border-grey-secondary bg-grey-eggshell p-3"
                >
                  <p className="font-archivo text-sm text-grey-moss-600">
                    {truncateAddress(address)}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveAdmin(address)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
