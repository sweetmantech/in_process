"use client";

import { Address } from "viem";
import CollectionAdmin from "./CollectionAdmin";
import AddCollectionAdmin from "./AddCollectionAdmin";

const Admins = () => {
  // TODO: Replace with actual collection admins data from provider/hook
  const collectionAdmins: Address[] = [];

  return (
    <div className="w-full font-archivo">
      <div className="mt-4 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-4 pt-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-archivo-medium text-lg">Current Admins</h3>
          {collectionAdmins.length === 0 ? (
            <p className="font-spectral-italic text-sm text-grey-secondary">No admins added yet.</p>
          ) : (
            <div className="space-y-2">
              {collectionAdmins.map((address: Address) => (
                <CollectionAdmin key={address} address={address} />
              ))}
            </div>
          )}
        </div>

        <AddCollectionAdmin />
      </div>
    </div>
  );
};

export default Admins;
