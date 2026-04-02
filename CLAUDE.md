# CLAUDE.md

This is a Next.js project for InProcess, a web3 platform for artists to create and manage "moments" (NFTs).

## Quick Reference

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Key Architecture Rules

1. **One function per file** - File name must match function name
2. **Components = JSX only** - No business logic, extract to hooks/lib

### File Organization

| Directory           | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `lib/[feature]/`    | Pure functions, API calls (one function per file) |
| `hooks/`            | Custom React hooks                                |
| `components/`       | JSX/HTML only (<120 lines)                        |
| `types/`            | All TypeScript types/interfaces                   |
| `supabase/[table]/` | Supabase query functions                          |

### API Pattern

All API calls use the external `IN_PROCESS_API` endpoint from `lib/consts.ts`:

```typescript
import { IN_PROCESS_API } from "@/lib/consts";

const response = await fetch(`${IN_PROCESS_API}/endpoint`);
```

**API Documentation**: https://docs.inprocess.world/api-reference

### Data Fetching Pattern

```typescript
// lib/[feature]/fetchSomething.ts - API function
export const fetchSomething = async (accessToken: string): Promise<SomeType> => {
  const res = await fetch(`${IN_PROCESS_API}/something`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
};

// hooks/useSomething.ts - React Query hook with Privy auth
export const useSomething = () => {
  const { getAccessToken } = usePrivy();
  return useQuery({
    queryKey: ["something"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      return fetchSomething(accessToken);
    },
  });
};
```

### Environment

- **Chain**: Base (mainnet) or Base Sepolia (testnet via `NEXT_PUBLIC_IS_TESTNET`)
- **Stack**: Next.js, TanStack Query, Privy (auth), Supabase, Viem

---

## Sound.xyz Admin Permission System

### Contract Architecture

Sound.xyz editions use **ERC721A** (not ERC1155), upgraded with **Solady `OwnableRoles`**. The edition contract (`SoundEditionV2_1`) manages all tiers internally as a uint8 identifier — there is **no per-tier permission model**.

### Role Constants (`contracts/sound.xyz/contracts/core/utils/LibOps.sol`)

| Role        | Value | Description                         |
| ----------- | ----- | ----------------------------------- |
| ADMIN_ROLE  | `1`   | `1 << 0` — admin actions on edition |
| MINTER_ROLE | `2`   | `1 << 1` — minting new tokens       |

### Granting Admin Permission

Call `grantRoles(address user, uint256 roles)` on the edition contract. Only the edition **owner** can call this.

```typescript
// Minimal ABI
{ name: "grantRoles", stateMutability: "payable",
  inputs: [{ name: "user", type: "address" }, { name: "roles", type: "uint256" }] }

// Grant admin to smart wallet
await client.writeContract({
  address: editionAddress,
  abi: soundEditionABI,
  functionName: "grantRoles",
  args: [smartWallet, BigInt(SOUND_ADMIN_ROLE)], // SOUND_ADMIN_ROLE = 1
});
```

### Comparison with Zora (InProcess) Protocol

| Protocol  | Contract Type | Permission Function                  | Collection Level         | Token/Tier Level             |
| --------- | ------------- | ------------------------------------ | ------------------------ | ---------------------------- |
| Zora      | ERC1155       | `addPermission(tokenId, addr, bits)` | `tokenId = 0, bits = 2`  | `tokenId = actual, bits = 2` |
| Sound.xyz | ERC721A       | `grantRoles(addr, roles)`            | `roles = 1 (ADMIN_ROLE)` | Same — no per-tier model     |

### Hook Structure

| Hook                                        | Context              | Description                                        |
| ------------------------------------------- | -------------------- | -------------------------------------------------- |
| `useSoundEditionGrantRoles(editionAddress)` | —                    | Core logic: calls `grantRoles` on edition          |
| `useGrantSoundEditionPermission`            | `CollectionProvider` | Edition-level grant                                |
| `useGrantSoundTierPermission`               | `MomentProvider`     | Tier-level grant (uses `moment.collectionAddress`) |

### Key Addresses (`contracts/config.yaml`)

| Contract       | Mainnet (Base 8453)                          |
| -------------- | -------------------------------------------- |
| SoundCreatorV2 | `0x0000000000aec84F5BFc2af15EAfb943bf4e3522` |
| SoundMetadata  | `0x0000000000f5A96Dc85959cAeb0Cfe680f108FB5` |
| SuperMinterV2  | `0x000000000001A36777f9930aAEFf623771b13e70` |
