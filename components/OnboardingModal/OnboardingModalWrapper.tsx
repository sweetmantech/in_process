"use client";

import OnboardingModal from "./OnboardingModal";
import { useOnboardingModal } from "@/hooks/useOnboardingModal";

export default function OnboardingModalWrapper() {
  const { isOpen, closeModal } = useOnboardingModal();

  return <OnboardingModal isOpen={isOpen} onClose={closeModal} />;
}
