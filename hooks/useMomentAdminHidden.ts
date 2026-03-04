import { useMemo } from "react";
import { type TimelineMoment } from "@/types/moment";
import { useUserProvider } from "@/providers/UserProvider";

/**
 * Hook to get the hidden state for the current user's admin status on a moment
 * Returns the hidden state from creator if user is the creator,
 * otherwise returns the hidden state from the matching admin entry
 */
export const useMomentAdminHidden = (moment: TimelineMoment): boolean => {
  const { artistWallet } = useUserProvider();

  return useMemo(() => {
    if (!artistWallet) {
      return moment.creator.hidden;
    }

    const normalizedWallet = artistWallet.toLowerCase();
    const normalizedCreator = moment.creator.address.toLowerCase();

    // Check if user is the creator
    if (normalizedCreator === normalizedWallet) {
      return moment.creator.hidden;
    }

    // Find matching admin entry
    const admin = moment.admins.find((admin) => admin.address.toLowerCase() === normalizedWallet);

    // Return admin's hidden state if found, otherwise default to creator
    return admin?.hidden ?? moment.creator.hidden;
  }, [moment, artistWallet]);
};
