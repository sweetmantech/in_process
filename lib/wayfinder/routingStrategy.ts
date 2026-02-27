import { FastestPingRoutingStrategy, SimpleCacheRoutingStrategy } from "@ar.io/wayfinder-core";
import gatewaysProvider from "./gatewaysProvider";

const routingStrategy = new SimpleCacheRoutingStrategy({
  routingStrategy: new FastestPingRoutingStrategy({
    timeoutMs: 5000,
    gatewaysProvider,
  }),
  ttlSeconds: 300,
});

export default routingStrategy;
