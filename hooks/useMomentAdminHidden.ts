import { useMemo } from "react";
import { type TimelineMoment } from "@/types/moment";
import { useUserProvider } from "@/providers/UserProvider";

/**
 * Hook to get the hidden state for the current user's admin status on a moment
 * Returns the hidden state from default_admin if user is the default admin,
 * otherwise returns the hidden state from the matching admin entry
 */
export const useMomentAdminHidden = (moment: TimelineMoment): boolean => {
  const { artistWallet } = useUserProvider();

  return useMemo(() => {
    if (!artistWallet) {
      return moment.default_admin.hidden;
    }

    const normalizedWallet = artistWallet.toLowerCase();

    // Check if user is the default admin
    if (moment.default_admin.address === normalizedWallet) {
      return moment.default_admin.hidden;
    }

    // Find matching admin entry
    const admin = moment.admins.find(
      (admin) => admin.address === normalizedWallet
    );

    // Return admin's hidden state if found, otherwise default to default_admin
    return admin?.hidden ?? moment.default_admin.hidden;
  }, [moment, artistWallet]);
};

