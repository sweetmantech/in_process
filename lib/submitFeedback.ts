import { toast } from "sonner";
import { Address } from "viem";

const submitFeedback = async (feedback: string, name: string, wallet?: Address) => {
  try {
    const response = await fetch(`/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback, name, wallet }),
    });
    if (!response.ok) throw new Error("failed to get submit feedback");
    await response.json();
    toast.success("submitted!");
  } catch (error) {
    console.error(error);
    toast.error("failed to submit feedback.");
  }
};

export default submitFeedback;
