import { updatePhoneVerified } from "../supabase/in_process_artist_phones/updatePhoneVerified";
import { sendSms } from "./sendSms";

const verifyPhone = async (phoneNumber: string) => {
  const { error } = await updatePhoneVerified(phoneNumber);
  if (error) {
    throw new Error("Failed to verify phone.");
  }
  await sendSms(
    phoneNumber,
    "Your phone number has been verified! You can now text photos and captions and we'll post them to In Process."
  );
};

export default verifyPhone;
