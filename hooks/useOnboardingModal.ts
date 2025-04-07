"use client";

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useArtistProfile } from './useArtistProfile';
import { Address } from 'viem';

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { ready, authenticated, user } = usePrivy();
  
  // Get the user's wallet address from Privy
  const walletAddress = user?.wallet?.address as Address | undefined;
  
  // Fetch the artist profile using the wallet address
  const { data: artistProfile, isLoading } = useArtistProfile(walletAddress);

  useEffect(() => {
    if (!ready || !authenticated || isLoading) return;

    // Check if the user has a username set in their artist profile
    const hasUsername = Boolean(artistProfile?.username);
    
    if (!hasUsername) {
      // Show modal if no username is set
      setIsOpen(true);
    } else {
      // Hide modal if username exists
      setIsOpen(false);
    }
    
    console.log('Checking username status:', { 
      walletAddress, 
      hasUsername: hasUsername,
      username: artistProfile?.username
    });
    
  }, [ready, authenticated, user, walletAddress, artistProfile, isLoading]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal
  };
} 