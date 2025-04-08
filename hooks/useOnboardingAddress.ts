import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useProfileProvider } from '@/providers/ProfileProvider';

export const useOnboardingAddress = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleEditing } = useProfileProvider();
  const [targetAddress, setTargetAddress] = useState<string | null>(null);

  useEffect(() => {
    if (targetAddress && pathname === `/${targetAddress}`) {
      toggleEditing();
      setTargetAddress(null);
    }
  }, [pathname, targetAddress, toggleEditing]);

  const handleStart = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const currentAddress = accounts[0]?.toLowerCase();
        
        if (currentAddress) {
          setTargetAddress(currentAddress);
          router.push(`/${currentAddress}`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error getting address:', error);
      return false;
    }
  };

  return { handleStart };
}; 