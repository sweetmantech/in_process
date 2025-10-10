import { toast } from "sonner";
import { Address } from "viem";

const submitFeedback = async (
  feedback: string,
  name: string,
  wallet?: Address,
  mediaFile?: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("name", name);
    if (wallet) formData.append("wallet", wallet);
    if (mediaFile) formData.append("media", mediaFile);

    const response = await fetch(`/api/feedback`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("failed to submit feedback");
    await response.json();
    toast.success("submitted!");
  } catch (error) {
    console.error(error);
    toast.error("failed to submit feedback.");
  }
};

export default submitFeedback;
