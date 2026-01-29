"use client";

import { useUserProvider } from "@/providers/UserProvider";
import { useState, useEffect } from "react";

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, socialWalletAddress } = useUserProvider();

  useEffect(() => {
    if (!profile || !socialWalletAddress) return;
    const onboarded = window.localStorage.getItem(`onboarded:${socialWalletAddress}`);
    const shouldOnboard = !Boolean(profile?.username) && !Boolean(onboarded);
    if (shouldOnboard) window.localStorage.setItem(`onboarded:${socialWalletAddress}`, "true");
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
