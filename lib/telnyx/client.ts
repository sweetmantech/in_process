import Telnyx from "telnyx";

const client = new Telnyx({
  apiKey: process.env.TELNYX_API_KEY!!,
});

export default client;
