import { useRef, useCallback } from "react";
import { UseFormSetValue, UseFormSetError, UseFormClearErrors, FieldPath } from "react-hook-form";
import { getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";
import isValidEnsName from "@/lib/ens/isValidEnsName";
import resolveAddressToEns from "@/lib/ens/resolveAddressToEns";
import resolveEnsToAddress from "@/lib/ens/resolveEnsToAddress";
import validateAddress from "@/lib/ens/validateAddress";
import { CreateFormData } from "@/lib/schema/createFormSchema";

type UseSplitAddressHandlerParams = {
  setValue: UseFormSetValue<CreateFormData>;
  setError: UseFormSetError<CreateFormData>;
  clearErrors: UseFormClearErrors<CreateFormData>;
};

const useSplitAddressHandler = ({
  setValue,
  setError,
  clearErrors,
}: UseSplitAddressHandlerParams) => {
  const resolveTimeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const handleAddressChange = useCallback(
    (index: number, value: string) => {
      // Clear existing timeout for this index
      if (resolveTimeouts.current[index]) {
        clearTimeout(resolveTimeouts.current[index]);
        delete resolveTimeouts.current[index];
      }

      const addressPath = `splits.${index}.address` as FieldPath<CreateFormData>;

      if (value === "") {
        setValue(addressPath, "");
        clearErrors(addressPath);
        return;
      }

      // Handle direct address - normalize immediately
      if (isAddress(value)) {
        const normalizedAddress = getAddress(value);
        setValue(addressPath, normalizedAddress);
        clearErrors(addressPath);

        // Resolve to ENS in background
        resolveAddressToEns(normalizedAddress).then((ensName) => {
          if (ensName) {
            try {
              const normalizedEns = normalize(ensName);
              setValue(addressPath, normalizedEns);
            } catch {}
          }
        });
        return;
      }

      // Handle ENS name
      if (value.includes(".")) {
        if (!isValidEnsName(value)) {
          setValue(addressPath, value);
          setError(addressPath, { message: "Invalid ENS name" });
          return;
        }

        try {
          const normalizedEns = normalize(value);
          setValue(addressPath, normalizedEns);
          clearErrors(addressPath);

          const looksComplete = /\.(eth|xyz|com|org|net|io|app|dev)$/i.test(normalizedEns);

          if (looksComplete) {
            resolveTimeouts.current[index] = setTimeout(async () => {
              try {
                const address = await resolveEnsToAddress(normalizedEns);
                if (!address) {
                  setError(addressPath, { message: "Invalid ENS name" });
                }
              } catch (error) {
                console.error("Error resolving ENS name:", error);
              }
              delete resolveTimeouts.current[index];
            }, 500);
          } else {
            resolveTimeouts.current[index] = setTimeout(() => {
              setError(addressPath, { message: "Invalid ENS name" });
              delete resolveTimeouts.current[index];
            }, 500);
          }
        } catch {
          setValue(addressPath, value);
          setError(addressPath, { message: "Invalid ENS name" });
        }
        return;
      }

      // Invalid input - validate with debounce
      setValue(addressPath, value);

      resolveTimeouts.current[index] = setTimeout(() => {
        const error = validateAddress(value);
        if (error) {
          setError(addressPath, { message: error });
        } else {
          setError(addressPath, { message: "Invalid address or ENS name" });
        }
        delete resolveTimeouts.current[index];
      }, 500);
    },
    [setValue, setError, clearErrors]
  );

  return { handleAddressChange };
};

export default useSplitAddressHandler;
