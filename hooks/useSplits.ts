import { useState, useMemo, useRef, useEffect } from "react";
import { getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";
import isValidEnsName from "@/lib/ens/isValidEnsName";
import resolveAddressToEns from "@/lib/ens/resolveAddressToEns";
import resolveEnsToAddress from "@/lib/ens/resolveEnsToAddress";
import validateAddress from "@/lib/ens/validateAddress";
import { SplitRecipient } from "@0xsplits/splits-sdk";

const useSplits = () => {
  const [splits, setSplits] = useState<SplitRecipient[]>([]);
  const [addressErrors, setAddressErrors] = useState<Record<number, string>>({});
  const resolveTimeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const addSplit = () => {
    setSplits([...splits, { address: "", percentAllocation: 0 }]);
  };

  const removeSplit = (index: number) => {
    if (resolveTimeouts.current[index]) {
      clearTimeout(resolveTimeouts.current[index]);
      delete resolveTimeouts.current[index];
    }

    setSplits(splits.filter((_, i) => i !== index));
    setAddressErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      const shifted: Record<number, string> = {};
      Object.keys(newErrors).forEach((key) => {
        const idx = Number(key);
        if (idx < index) {
          shifted[idx] = newErrors[idx];
        } else if (idx > index) {
          shifted[idx - 1] = newErrors[idx];
        }
      });
      return shifted;
    });

    const shiftedTimeouts: Record<number, ReturnType<typeof setTimeout>> = {};
    Object.keys(resolveTimeouts.current).forEach((key) => {
      const idx = Number(key);
      if (idx < index) {
        shiftedTimeouts[idx] = resolveTimeouts.current[idx];
      } else if (idx > index) {
        shiftedTimeouts[idx - 1] = resolveTimeouts.current[idx];
      }
    });
    resolveTimeouts.current = shiftedTimeouts;
  };

  const updateSplit = (index: number, field: keyof SplitRecipient, value: string | number) => {
    setSplits(splits.map((split, i) => (i === index ? { ...split, [field]: value } : split)));
  };

  const totalPercentage = useMemo(
    () => splits.reduce((sum, split) => sum + (split.percentAllocation || 0), 0),
    [splits]
  );

  const isValid = useMemo(() => totalPercentage === 100, [totalPercentage]);

  const handleAddressChange = (index: number, value: string) => {
    if (resolveTimeouts.current[index]) {
      clearTimeout(resolveTimeouts.current[index]);
      delete resolveTimeouts.current[index];
    }

    if (value === "") {
      updateSplit(index, "address", "");
      setAddressErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
      return;
    }

    if (isAddress(value)) {
      const normalizedAddress = getAddress(value);

      setAddressErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });

      updateSplit(index, "address", normalizedAddress);

      resolveAddressToEns(normalizedAddress).then((ensName) => {
        if (ensName) {
          try {
            const normalizedEns = normalize(ensName);
            updateSplit(index, "address", normalizedEns);
          } catch {}
        }
      });
      return;
    }

    if (value.includes(".")) {
      if (!isValidEnsName(value)) {
        updateSplit(index, "address", value);
        setAddressErrors((prev) => ({ ...prev, [index]: "Invalid ENS name" }));
        return;
      }

      try {
        const normalizedEns = normalize(value);
        updateSplit(index, "address", normalizedEns);

        setAddressErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[index];
          return newErrors;
        });

        if (resolveTimeouts.current[index]) {
          clearTimeout(resolveTimeouts.current[index]);
        }

        const looksComplete = /\.(eth|xyz|com|org|net|io|app|dev)$/i.test(normalizedEns);

        if (looksComplete) {
          resolveTimeouts.current[index] = setTimeout(async () => {
            try {
              const address = await resolveEnsToAddress(normalizedEns);
              if (!address) {
                setAddressErrors((prev) => ({ ...prev, [index]: "Invalid ENS name" }));
              }
            } catch (error) {
              console.error("Error resolving ENS name:", error);
            }
            delete resolveTimeouts.current[index];
          }, 500);
        } else {
          resolveTimeouts.current[index] = setTimeout(() => {
            setAddressErrors((prev) => ({ ...prev, [index]: "Invalid ENS name" }));
            delete resolveTimeouts.current[index];
          }, 500);
        }
      } catch {
        updateSplit(index, "address", value);
        setAddressErrors((prev) => ({ ...prev, [index]: "Invalid ENS name" }));
      }
      return;
    }

    updateSplit(index, "address", value);

    if (resolveTimeouts.current[index]) {
      clearTimeout(resolveTimeouts.current[index]);
    }

    resolveTimeouts.current[index] = setTimeout(() => {
      const error = validateAddress(value);
      if (error) {
        setAddressErrors((prev) => ({ ...prev, [index]: error }));
      } else {
        setAddressErrors((prev) => ({ ...prev, [index]: "Invalid address or ENS name" }));
      }
      delete resolveTimeouts.current[index];
    }, 500);
  };

  const handlePercentageChange = (index: number, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      updateSplit(index, "percentAllocation", numValue);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(resolveTimeouts.current).forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);

  return {
    splits,
    addSplit,
    removeSplit,
    updateSplit,
    totalPercentage,
    isValid,
    handleAddressChange,
    handlePercentageChange,
    addressErrors,
  };
};

export default useSplits;
