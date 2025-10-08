import { keccak256, toBytes, type Address, getAddress } from "viem";

// Fisher–Yates with deterministic per-step randomness from keccak256(seed + i)
function deterministicShuffle<T>(array: T[], seed: string): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const h = keccak256(toBytes(`${seed}:${i}`)); // 0x...
    const r = Number(BigInt(h) % BigInt(i + 1));
    [a[i], a[r]] = [a[r], a[i]];
  }
  return a;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Encode a bigint using a custom shuffled alphabet of given radix
function encodeWithAlphabet(value: bigint, alphabet: string): string {
  const base = BigInt(alphabet.length);
  if (value === BigInt(0)) return alphabet[0]!;
  let v = value;
  let out = "";
  while (v > BigInt(0)) {
    const d = Number(v % base);
    out = alphabet[d]! + out;
    v = v / base;
  }
  return out;
}

/**
 * Deterministically generate a username from an EVM address.
 * - Radix chosen deterministically in [2..36]
 * - Alphabet is the shuffled first `radix` characters of 0-9a-z
 * - Output length clamped to [2..36]
 */
export function deterministicAccountName(address: string, desiredLength = 12): string {
  const addr: Address = getAddress(address); // checksum & normalize
  const hex = addr.toLowerCase();

  // Choose radix in [2..36] deterministically from address
  const hRadix = keccak256(toBytes(`${hex}:radix`));
  const radix = 2 + Number(BigInt(hRadix) % BigInt(35)); // 2..36

  // Build and deterministically shuffle base36 alphabet, then take first `radix`
  const base36 = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
  const shuffled = deterministicShuffle(base36, `${hex}:alphabet`);
  const alphabet = shuffled.slice(0, radix).join("");

  // Hash address to a bigint to encode
  const valHex = keccak256(toBytes(`${hex}:value`)); // 32 bytes
  const value = BigInt(valHex);

  // Encode using shuffled alphabet
  const raw = encodeWithAlphabet(value, alphabet);

  // Clamp final length to [2..36], left-pad if too short, slice if too long
  const target = clamp(desiredLength, 2, 36);
  const padChar = alphabet[0]!;
  const padded = raw.length < 2 ? padChar.repeat(2 - raw.length) + raw : raw;
  const username = padded.padStart(target, padChar).slice(-target);

  return username; // purely lowercase 0-9a-z subset, URL-safe
}
