import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const TotalSupplyInput = () => {
  const { form } = useMetadataFormProvider();

  return (
    <>
      <p className="pt-2 font-archivo font-medium">Total Supply</p>

      <Controller
        name="totalSupply"
        control={form.control}
        render={({ field }) => (
          <Input
            type="number"
            min={1}
            placeholder="Leave empty for open edition"
            value={field.value === undefined ? "" : field.value}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                field.onChange(undefined);
              } else {
                const num = parseInt(value, 10);
                if (!isNaN(num) && num >= 1) {
                  field.onChange(num);
                }
              }
            }}
            onBlur={field.onBlur}
            className="font-spectral"
          />
        )}
      />
      {form.formState.errors.totalSupply && (
        <p className="mt-1 font-spectral text-xs text-red-500">
          {form.formState.errors.totalSupply.message}
        </p>
      )}
    </>
  );
};

export default TotalSupplyInput;
