import { z } from "zod";

const bigIntString = z.union([z.string(), z.number()]).transform((val) => BigInt(val));
export default bigIntString;
