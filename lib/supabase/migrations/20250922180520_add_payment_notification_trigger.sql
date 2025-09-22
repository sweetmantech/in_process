-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS payment_notification_trigger ON in_process_payments;
DROP FUNCTION IF EXISTS create_payment_notification();

-- Create function to automatically create notification when payment is created
CREATE OR REPLACE FUNCTION create_payment_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for the artist (token.defaultAdmin) when a payment is created
  INSERT INTO in_process_notifications (payment, artist, viewed)
  SELECT 
    NEW.id,
    t."defaultAdmin",
    false
  FROM in_process_tokens t
  WHERE t.id = NEW.token;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function on payment insert
CREATE TRIGGER payment_notification_trigger
  AFTER INSERT ON in_process_payments
  FOR EACH ROW
  EXECUTE FUNCTION create_payment_notification();

-- Add comment for documentation
COMMENT ON FUNCTION create_payment_notification() IS 'Automatically creates notification for artist when payment is created';
COMMENT ON TRIGGER payment_notification_trigger ON in_process_payments IS 'Triggers notification creation on payment insert';
