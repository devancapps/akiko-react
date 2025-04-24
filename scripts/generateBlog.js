const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const axios = require('axios');
const { marked } = require('marked');
const slugify = require('./utils/slugify');
const readTime = require('./utils/readTime');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ensure directories exist
const blogsDir = path.join(__dirname, '../src/blogs');
const dataDir = path.join(__dirname, '../src/data');
const blogsPath = path.join(dataDir, 'blogs.json');

// Create directories if they don't exist
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize blogs.json if it doesn't exist
if (!fs.existsSync(blogsPath)) {
  fs.writeFileSync(blogsPath, JSON.stringify([], null, 2));
}

// Load existing blogs
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

async function generateBlog() {
  try {
    // Generate blog topic
    const topicResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel blog topic generator. Generate unique, SEO-friendly travel blog topics."
        },
        {
          role: "user",
          content: "Generate a unique travel blog topic that hasn't been covered in our existing blogs."
        }
      ],
    });

    const topic = topicResponse.choices[0].message.content;

    // Generate blog content
    const contentResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel blogger writing SEO-optimized content. Write in markdown format."
        },
        {
          role: "user",
          content: `Write an 800-word travel blog post about "${topic}". Include markdown formatting, headings, and lists.`
        }
      ],
    });

    const content = contentResponse.choices[0].message.content;

    // Get image from Pexels
    const pexelsResponse = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: process.env.PEXELS_API_KEY
      },
      params: {
        query: topic,
        per_page: 1
      }
    });

    const imageUrl = pexelsResponse.data.photos[0].src.original;

    // Generate slug and create blog post
    const slug = slugify(topic);
    const blogPath = path.join(blogsDir, `${slug}.md`);
    
    // Check if blog already exists
    if (fs.existsSync(blogPath)) {
      console.log(`Blog with slug ${slug} already exists. Skipping...`);
      return null;
    }
    
    // Extract excerpt (first paragraph)
    const excerpt = content.split('\n\n')[0];

    // Calculate read time
    const estimatedReadTime = readTime(content);

    // Create blog post
    const blogPost = {
      title: topic,
      slug,
      content,
      excerpt,
      image: imageUrl,
      readTime: estimatedReadTime,
      createdAt: new Date().toISOString()
    };

    // Save markdown file
    fs.writeFileSync(blogPath, content);

    // Update blogs.json
    blogs.push(blogPost);
    fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));

    console.log(`Successfully generated blog post: ${topic}`);
    return blogPost;

  } catch (error) {
    console.error('Error generating blog:', error);
    throw error;
  }
}

// Run the generator
generateBlog().catch(console.error); 