// Simple sanitization function that only allows <strong> tags
export const sanitizeHTML = (text: string): string => {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/<[^>]*>/g, (match) => {
      // Only allow <strong> tags
<<<<<<< HEAD
      if (match.toLowerCase() === "<strong>" || match.toLowerCase() === "</strong>") {
=======
      if (
        match.toLowerCase() === "<strong>" ||
        match.toLowerCase() === "</strong>"
      ) {
>>>>>>> 8e1db48759342529f34e1b1d337c4a893fcc3c90
        return match;
      }
      return "";
    });
};
