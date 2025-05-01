"use client";

import { useUserProvider } from "@/providers/UserProvider";
import { useState, useEffect } from "react";

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, connectedAddress } = useUserProvider();

  useEffect(() => {
    if (!profile || !connectedAddress) return;
    const onboarded = window.localStorage.getItem(
      `onboarded:${connectedAddress}`,
    );
    const shouldOnboard = !Boolean(profile?.username) && !Boolean(onboarded);
    if (shouldOnboard)
      window.localStorage.setItem(`onboarded:${connectedAddress}`, "true");
    setIsOpen(shouldOnboard);
  }, [profile]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal,
    resetCurrentSlide: () => setIsOpen(true),
  };
}
