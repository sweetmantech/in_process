import { IN_PROCESS_API } from "@/lib/consts";
import { toast } from "sonner";

export interface CreateMomentParameters {
  // Add the actual parameter types based on what fetchParameters returns
  [key: string]: any;
}

export interface CreateMomentResult {
  contractAddress: string;
  tokenId: number;
}

export async function createMomentApi(
  parameters: CreateMomentParameters
): Promise<CreateMomentResult> {
  const maxRetries = 3;
  const retryDelay = 4000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(`${IN_PROCESS_API}/moment/create`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parameters),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.message || "Failed to create moment";

      // Retry on gas estimation errors
      if (errorMessage.includes("failed to estimate gas") && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        toast.info(`Network is busy. Retrying to create moment... ${attempt + 1} of ${maxRetries}`);
        continue;
      }

      if (errorMessage.includes("failed to estimate gas")) {
        toast.info(
          "Gas estimation failed. It seems like the network is busy. Please try again in a few minutes."
        );
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  }

  throw new Error("Failed to create moment after retries");
}
