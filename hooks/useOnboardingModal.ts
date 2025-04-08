"use client";

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useArtistProfile } from './useArtistProfile';
import { Address } from 'viem';

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { ready, authenticated, user } = usePrivy();
  
  const walletAddress = user?.wallet?.address as Address | undefined;
  
  const { data: artistProfile, isLoading } = useArtistProfile(walletAddress);

  useEffect(() => {
    if (!ready || !authenticated || isLoading) return;

    const hasUsername = Boolean(artistProfile?.username);
    setIsOpen(!hasUsername);
  }, [ready, authenticated, user, walletAddress, artistProfile, isLoading]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal,
    resetCurrentSlide: () => setIsOpen(true)
  };
} 