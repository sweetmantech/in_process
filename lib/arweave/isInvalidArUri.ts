/** Bad upload previously produced literal `ar://${undefined}` from Turbo lacking an id */
export const isInvalidArUri = (uri: string): boolean => uri === "ar://undefined";
