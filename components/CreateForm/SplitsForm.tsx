"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";
import { Plus, X } from "lucide-react";

const SplitsForm = () => {
  const {
    splits,
    addSplit,
    removeSplit,
    totalPercentage,
    isValid,
    handleAddressChange,
    handlePercentageChange,
    addressErrors,
  } = useMomentCreateProvider();

  return (
    <div className="w-full pt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium font-archivo">splits</p>
        <Button
          type="button"
          onClick={addSplit}
          className="h-8 w-8 p-0 rounded-sm bg-black hover:bg-grey-moss-300 text-grey-eggshell"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {splits.map((split, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col">
                <Input
                  type="text"
                  placeholder="address"
                  value={split.address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  className={`font-spectral ${addressErrors[index] ? "border-red-500" : ""}`}
                />
                {addressErrors[index] && (
                  <p className="text-xs text-red-500 font-spectral mt-1 pl-0">
                    {addressErrors[index]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="%"
                  min="0"
                  max="100"
                  step="0.01"
                  value={split.percentage || ""}
                  onChange={(e) => handlePercentageChange(index, e.target.value)}
                  className="w-20 font-spectral"
                />
                <Button
                  type="button"
                  onClick={() => removeSplit(index)}
                  className="h-8 w-8 p-0 rounded-sm bg-black hover:bg-grey-moss-300 text-grey-eggshell"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {splits.length > 0 && (
        <div className="mt-2">
          <p className={`text-sm font-spectral ${isValid ? "text-grey-moss-400" : "text-red-500"}`}>
            Total: {totalPercentage.toFixed(2)}% {!isValid && "(must equal 100%)"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SplitsForm;
