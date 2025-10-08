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

export default encodeWithAlphabet;
