import { HashVerificationStrategy } from "@ar.io/wayfinder-core";
import gateways from "./gateways";

const verificationStrategy = new HashVerificationStrategy({
  trustedGateways: gateways.map((g) => new URL(g)),
});

export default verificationStrategy;
