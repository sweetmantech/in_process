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

### Data Fetching Pattern

```typescript
// lib/[feature]/fetchSomething.ts - API function
export const fetchSomething = async (): Promise<SomeType> => {
  const res = await fetch(`${IN_PROCESS_API}/something`);
  return res.json();
};

// hooks/useSomething.ts - React Query hook
export const useSomething = () => {
  return useQuery({
    queryKey: ["something"],
    queryFn: fetchSomething,
  });
};
```

### Environment

- **Chain**: Base (mainnet) or Base Sepolia (testnet via `NEXT_PUBLIC_IS_TESTNET`)
- **Stack**: Next.js, TanStack Query, Privy (auth), Supabase, Viem
