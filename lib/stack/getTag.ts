import { Address } from "viem";
import getStackClient from "./getStackClient";

const getTag = async (account: Address, tag: string) => {
  try {
    const stackClient = getStackClient();

    const tags = await stackClient.getTags(account, tag);
    return tags;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getTag;
