import sanitizeHtml from "sanitize-html"

/** Keep only editorial text markup from the CMS. Never trust CMS HTML at render time. */
export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
      "strong", "em", "b", "i", "a", "code", "pre", "hr",
    ],
    allowedAttributes: { a: ["href", "title"] },
    allowedSchemes: ["https", "http", "mailto"],
    allowedSchemesAppliedToAttributes: ["href"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    nonTextTags: ["script", "style", "textarea", "option", "iframe", "svg", "math"],
  })
}
