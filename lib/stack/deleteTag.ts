import { Address } from "viem";
import getStackClient from "./getStackClient";

const deleteTag = async (account: Address, tag: string) => {
  try {
    const stackClient = getStackClient();
    await stackClient.deleteTags(account, tag);
  } catch (error) {
    console.error(error);
  }
};

export default deleteTag;
