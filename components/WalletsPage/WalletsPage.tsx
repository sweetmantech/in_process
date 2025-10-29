"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserName from "./UserName";
import { Address } from "viem";
import { useWalletUsers } from "@/hooks/useWalletUsers";

const WalletsPage = () => {
  const { data: users = [], isLoading: loading, error } = useWalletUsers();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 md:px-12 py-4 md:py-16">
        <h1 className="text-2xl font-archivo-bold mb-6">Wallet Sign-Ins</h1>
        <p className="font-archivo">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 md:px-12 py-4 md:py-16">
        <h1 className="text-2xl font-archivo-bold mb-6">Wallet Sign-Ins</h1>
        <p className="text-red-500 font-archivo">
          Error: {error instanceof Error ? error.message : "Failed to load wallet users"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-4 md:py-16">
      <h1 className="text-2xl font-archivo-bold mb-6">Wallet Sign-Ins</h1>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-archivo-medium">Username</TableHead>
              <TableHead className="font-archivo-medium">Wallet Address</TableHead>
              <TableHead className="font-archivo-medium">Wallet Type</TableHead>
              <TableHead className="font-archivo-medium">Sign-In Method</TableHead>
              <TableHead className="font-archivo-medium">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 font-archivo">
                  No wallet sign-ins found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={`${user.userId}-${user.walletAddress}`}>
                  <TableCell className="font-archivo">
                    <UserName walletAddress={user.walletAddress as Address} />
                  </TableCell>
                  <TableCell className="font-spectral text-sm">{user.walletAddress}</TableCell>
                  <TableCell className="font-archivo">{user.walletType}</TableCell>
                  <TableCell className="font-archivo">
                    {user.signInMethod === "email_then_wallet" ? "Email → Wallet" : "Wallet Direct"}
                  </TableCell>
                  <TableCell className="font-archivo">{formatDate(user.lastSeen)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WalletsPage;
