"use client";

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { ready, authenticated, user } = usePrivy();

  useEffect(() => {

    if (!ready) return;

    // Only proceed if user is authenticated
    if (authenticated) {
      const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
      console.log('Checking onboarding status:', { hasCompletedOnboarding });
      
      if (!hasCompletedOnboarding) {
        setIsOpen(true);
      } else {
        console.log('User has already completed onboarding');
      }
    }
  }, [ready, authenticated, user]);

  const closeModal = () => {
    console.log('Closing modal and marking as completed');
    setIsOpen(false);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  return {
    isOpen,
    closeModal
  };
} 