import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML content to prevent XSS attacks using DOMPurify
 * Works consistently on both client and server using isomorphic-dompurify
 * For embed code, allows more permissive settings
 * For text content, uses strict settings
 */
export const sanitizeHTML = (html: string, isEmbedCode = false): string => {
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
