const NONCE_WINDOW_MS = 60 * 60 * 1000;

export const getTimeNonce = () => Math.floor(Date.now() / NONCE_WINDOW_MS).toString();
