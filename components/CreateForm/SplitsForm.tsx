"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";
import { Controller } from "react-hook-form";
import useSplitsForm from "@/hooks/useSplitsForm";

const SplitsForm = () => {
  const { form, fields, handleAddressChange, handleAddSplit, handleRemoveSplit } = useSplitsForm();

  return (
    <div className="w-full pt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium font-archivo">splits</p>
        <Button
          type="button"
          onClick={handleAddSplit}
          className="h-8 w-8 p-0 rounded-sm bg-black hover:bg-grey-moss-300 text-grey-eggshell"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col">
                <Controller
                  name={`splits.${index}.address`}
                  control={form.control}
                  render={({ field: formField }) => (
                    <Input
                      type="text"
                      placeholder="address"
                      {...formField}
                      onChange={(e) => {
                        formField.onChange(e);
                        handleAddressChange(index, e.target.value);
                        form.trigger("splits");
                      }}
                      className={`font-spectral ${form.formState.errors.splits?.[index]?.address ? "border-red-500" : ""}`}
                    />
                  )}
                />
                {form.formState.errors.splits?.[index]?.address && (
                  <p className="text-xs text-red-500 font-spectral mt-1 pl-0">
                    {form.formState.errors.splits?.[index]?.address?.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Controller
                  name={`splits.${index}.percentAllocation`}
                  control={form.control}
                  render={({ field: formField }) => (
                    <Input
                      type="number"
                      placeholder="%"
                      min="0"
                      max="100"
                      step="0.01"
                      {...formField}
                      value={formField.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const numValue = val === "" ? 0 : parseFloat(val);
                        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                          formField.onChange(numValue);
                          form.trigger("splits");
                        }
                      }}
                      className="w-20 font-spectral"
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveSplit(index)}
                  className="h-8 w-8 p-0 rounded-sm bg-black hover:bg-grey-moss-300 text-grey-eggshell"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fields.length > 0 && (
        <div className="mt-2">
          {form.formState.errors.splits && (
            <p className="text-xs text-red-500 font-spectral mt-1">
              {form.formState.errors.splits.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SplitsForm;
