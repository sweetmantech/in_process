import { useState, useMemo } from "react";
import { normalizeUsPhoneNumber } from "@/lib/phones/normalizeUsPhoneNumber";

/**
 * Hook for validating phone number input in real-time.
 * Returns validation state and error message.
 */
export const usePhoneNumberValidation = (phoneNumber: string) => {
  const [hasBlurred, setHasBlurred] = useState(false);

  const validation = useMemo(() => {
    if (!phoneNumber.trim()) {
      return {
        isValid: false,
        errorMessage: null,
        normalizedValue: null,
      };
    }

    try {
      const normalized = normalizeUsPhoneNumber(phoneNumber);
      return {
        isValid: true,
        errorMessage: null,
        normalizedValue: normalized,
      };
    } catch (error: any) {
      return {
        isValid: false,
        errorMessage: error?.message || "Invalid phone number",
        normalizedValue: null,
      };
    }
  }, [phoneNumber]);

  return {
    ...validation,
    hasBlurred,
    setHasBlurred,
    showError: hasBlurred && !validation.isValid && phoneNumber.trim() !== "",
  };
};
