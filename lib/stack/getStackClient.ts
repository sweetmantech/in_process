import { StackClient } from "@stackso/js-core";

const getStackClient = () => {
  const stack = new StackClient({
    apiKey: process.env.STACK_API_KEY as string,
    pointSystemId: parseInt(
      process.env.NEXT_PUBLIC_IDENTITY_STACK_POINT_ID as string,
      10,
    ),
  });

  return stack;
};

export default getStackClient;
