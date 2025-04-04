"use client";

import OnboardingModal from './OnboardingModal';
import { useOnboardingModal } from '@/hooks/useOnboardingModal';

export default function OnboardingModalWrapper() {
  const { isOpen, closeModal } = useOnboardingModal();
  
  // Simple render with minimal logic
  return <OnboardingModal isOpen={isOpen} onClose={closeModal} />;
} 