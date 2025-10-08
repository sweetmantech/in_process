import { keccak256, toBytes } from "viem";

function deterministicShuffle<T>(array: T[], seed: string): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const h = keccak256(toBytes(`${seed}:${i}`)); // 0x...
    const r = Number(BigInt(h) % BigInt(i + 1));
    [a[i], a[r]] = [a[r], a[i]];
  }
  return a;
}

export default deterministicShuffle;
