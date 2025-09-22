-- Create in_process_notifications table
CREATE TABLE in_process_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment UUID NOT NULL REFERENCES in_process_payments(id) ON DELETE CASCADE,
    artist TEXT NOT NULL REFERENCES in_process_artists(address) ON DELETE CASCADE,
    viewed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_in_process_notifications_payment ON in_process_notifications(payment);
CREATE INDEX idx_in_process_notifications_artist ON in_process_notifications(artist);
CREATE INDEX idx_in_process_notifications_viewed ON in_process_notifications(viewed);
CREATE INDEX idx_in_process_notifications_artist_viewed ON in_process_notifications(artist, viewed);

-- Add comment for documentation
COMMENT ON TABLE in_process_notifications IS 'Notifications for payment events in the in-process system';
COMMENT ON COLUMN in_process_notifications.payment IS 'Foreign key reference to in_process_payments table';
COMMENT ON COLUMN in_process_notifications.artist IS 'Foreign key reference to in_process_artists table';
COMMENT ON COLUMN in_process_notifications.viewed IS 'Whether the notification has been viewed by the user';
