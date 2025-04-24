const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

function updateSitemap(blogs) {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  const baseUrl = 'https://akiko.dev';
  const today = format(new Date(), 'yyyy-MM-dd');

  // Start with the static URLs
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/resources</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add blog post URLs
  blogs.forEach(blog => {
    const lastmod = format(new Date(blog.createdAt), 'yyyy-MM-dd');
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Close the XML
  sitemap += '\n</urlset>';

  // Write to file
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap updated successfully');
}

module.exports = updateSitemap; 