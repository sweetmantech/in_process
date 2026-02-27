import { StaticGatewaysProvider } from "@ar.io/wayfinder-core";
import gateways from "./gateways";

const gatewaysProvider = new StaticGatewaysProvider({ gateways });

export default gatewaysProvider;
