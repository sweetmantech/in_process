import DOMPurify from "isomorphic-dompurify";
import { FORBIDDEN_EVENT_HANDLERS } from "../consts";

/**
 * Sanitizes HTML content to prevent XSS attacks using DOMPurify
 * Works consistently on both client and server using isomorphic-dompurify
 * For embed code, allows more permissive settings
 * For text content, uses strict settings
 *
 * Security measures:
 * - Removes style attribute to prevent CSS-based XSS (e.g., via animation handlers)
 * - Explicitly forbids all on* event handler attributes for defense-in-depth
 * - Uses DOMPurify's allow-list model for robust sanitization
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
      // Explicitly forbid all event handler attributes for defense-in-depth
      FORBID_ATTR: FORBIDDEN_EVENT_HANDLERS,
    });
  }

  // Strict sanitization for text content
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["strong", "em", "u", "br", "p", "a"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    // Explicitly forbid all event handler attributes for defense-in-depth
    FORBID_ATTR: FORBIDDEN_EVENT_HANDLERS,
  });
};
