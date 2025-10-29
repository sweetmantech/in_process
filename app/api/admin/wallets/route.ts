import { NextRequest } from "next/server";
import { getWalletUsers } from "@/lib/privy/getWalletUsers";
import { authMiddleware } from "@/middleware/authMiddleware";
import getCorsHeader from "@/lib/getCorsHeader";

const getAdminAddresses = (): string[] => {
  const adminAddresses = process.env.ADMIN_ADDRESSES;
  if (!adminAddresses) return [];
  return adminAddresses.split(",").map((addr) => addr.toLowerCase().trim());
};

const isAdmin = (address: string): boolean => {
  const adminAddresses = getAdminAddresses();
  if (adminAddresses.length === 0) {
    console.warn("ADMIN_ADDRESSES environment variable is not set");
    return false;
  }
  return adminAddresses.includes(address.toLowerCase());
};

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeader();

  // Authenticate user
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) {
    return authResult;
  }

  // Check if user is admin
  if (!isAdmin(authResult.artistAddress)) {
    return Response.json(
      { message: "Forbidden: Admin access required" },
      { status: 403, headers: corsHeaders }
    );
  }

  try {
    const walletUsers = await getWalletUsers();
    return Response.json({ users: walletUsers }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Failed to fetch wallet users:", error);
    return Response.json(
      { message: error.message || "Failed to fetch wallet users" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const dynamic = "force-dynamic";
