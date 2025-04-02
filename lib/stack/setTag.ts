import { Address } from "viem";
import getStackClient from "./getStackClient";

const setTag = async (account: Address, tag: string, tags: any) => {
  try {
    const stackClient = getStackClient();
    const response = await stackClient.setTag(account, tag, tags);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("failed to set tag.");
  }
};

export default setTag;
