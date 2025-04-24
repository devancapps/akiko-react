function linkify(content, blogs) {
  let linkedContent = content;
  
  blogs.forEach(({ title, slug }) => {
    const regex = new RegExp(`\\b${title}\\b`, 'gi');
    const anchor = `<a href='/blog/${slug}' class='text-blue-600 hover:text-blue-800'>${title}</a>`;
    linkedContent = linkedContent.replace(regex, anchor);
  });
  
  return linkedContent;
}

export default linkify; 