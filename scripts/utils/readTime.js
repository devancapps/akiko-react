function readTime(text) {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

module.exports = readTime; 