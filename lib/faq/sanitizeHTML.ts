import DOMPurify from "dompurify";

/**
 * Sanitizes HTML content to prevent XSS attacks
 * For embed code, allows more permissive settings
 * For text content, uses strict settings
 */
export const sanitizeHTML = (html: string, isEmbedCode = false): string => {
  if (typeof window === "undefined") {
    // Server-side: strict sanitization
    // Remove all script tags and event handlers
    let sanitized = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, (match) => {
        // Only allow iframes with sandbox attribute
        if (match.includes("sandbox")) {
          // Ensure sandbox doesn't include allow-scripts
          return match.replace(/sandbox="[^"]*"/gi, (sandbox) => {
            const attrs = sandbox.replace(/sandbox="|"/g, "").split(/\s+/);
            const filtered = attrs.filter((attr) => attr !== "allow-scripts");
            return `sandbox="${filtered.join(" ")}"`;
          });
        }
        return "";
      })
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .replace(/data:text\/html/gi, ""); // Block data URIs with HTML
    return sanitized;
  }

  // Client-side: use DOMPurify
  if (isEmbedCode) {
    // For embed codes, only allow iframes (not scripts in main page)
    // Scripts can run inside iframes if sandbox allows, but not in main page
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "iframe",
        "embed",
        "object",
        "video",
        "audio",
        "source",
        "track",
        "div",
        "span",
        "p",
        "br",
        "strong",
        "em",
        "u",
        "a",
        "img",
      ],
      ALLOWED_ATTR: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
        "sandbox",
        "class",
        "id",
        "style",
        "href",
        "target",
        "rel",
        "alt",
        "title",
        "loading",
        "referrerpolicy",
      ],
      ALLOW_DATA_ATTR: false,
      KEEP_CONTENT: true,
      // Remove any script tags that might be in the HTML
      FORBID_TAGS: ["script", "style"],
      FORBID_ATTR: ["onerror", "onload", "onclick"],
    });
  }

  // Strict sanitization for text content
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["strong", "em", "u", "br", "p", "a"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });
};
