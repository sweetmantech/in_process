import { DuneClient } from "@duneanalytics/client-sdk";
const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");

export default client;
