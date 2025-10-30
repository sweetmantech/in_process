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
import { useWalletUsers } from "@/hooks/useWalletUsers";
import { Address } from "viem";
import { transformWalletUsers } from "@/lib/admin/transformWalletUsers";

const WalletsPage = () => {
  const { data: users = [], isLoading: loading, error } = useWalletUsers();

  const formattedUsers = transformWalletUsers(users);

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
              <TableHead className="font-archivo-medium">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Boolean(formattedUsers.length) ? (
              formattedUsers.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-archivo">
                      <UserName walletAddress={user.walletAddress as Address} />
                    </TableCell>
                    <TableCell className="font-spectral text-sm">{user.walletAddress}</TableCell>
                    <TableCell className="font-archivo">
                      {new Date(user.lastSeen * 1000).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 font-archivo">
                  No wallet sign-ins found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WalletsPage;
