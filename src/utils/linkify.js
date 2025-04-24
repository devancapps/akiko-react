/**
 * Converts internal markdown links to React Router links
 * @param {string} content - The markdown content to process
 * @returns {string} - Processed content with internal links converted
 */
export function linkify(content) {
  if (!content) return '';
  
  // Replace internal markdown links [text](/path) with React Router links
  return content.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g,
    (match, text, path) => `[${text}](/blog/${path})`
  );
}

export default linkify; 