// Simple sanitization function that only allows <strong> tags
export const sanitizeHTML = (text: string): string => {
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<[^>]*>/g, (match) => {
        // Only allow <strong> tags
        if (match.toLowerCase() === '<strong>' || match.toLowerCase() === '</strong>') {
          return match;
        }
        return '';
      });
  };