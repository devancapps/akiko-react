import { OpenAI } from 'openai';
import axios from 'axios';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

// Pexels API configuration
const pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY;
const pexelsBaseUrl = 'https://api.pexels.com/v1';

export async function generateBlogTitle(topic) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel blog title generator. Generate unique, SEO-friendly travel blog titles."
        },
        {
          role: "user",
          content: `Generate a unique travel blog title about ${topic} that hasn't been covered in our existing blogs.`
        }
      ],
      temperature: 0.7,
      max_tokens: 60,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating blog title:', error);
    throw error;
  }
}

export async function generateBlogContent(title) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel blogger writing SEO-optimized content. Write in markdown format."
        },
        {
          role: "user",
          content: `Write an 800-word travel blog post titled "${title}". Include markdown formatting, headings, and lists.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating blog content:', error);
    throw error;
  }
}

export async function getPexelsImage(query) {
  try {
    const response = await axios.get(`${pexelsBaseUrl}/search`, {
      headers: {
        Authorization: pexelsApiKey
      },
      params: {
        query,
        per_page: 1,
        orientation: 'landscape'
      }
    });

    if (response.data.photos.length === 0) {
      throw new Error('No images found for query');
    }

    return response.data.photos[0].src.original;
  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    throw error;
  }
}

export async function generateNewBlog() {
  try {
    // Generate a random travel topic
    const topics = [
      'budget travel tips',
      'solo travel',
      'digital nomad lifestyle',
      'hidden gems in Europe',
      'Asian street food',
      'sustainable travel',
      'adventure travel',
      'luxury travel on a budget',
      'travel photography tips',
      'cultural immersion'
    ];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Generate title and content
    const title = await generateBlogTitle(randomTopic);
    const content = await generateBlogContent(title);
    
    // Get image
    const image = await getPexelsImage(title);
    
    return {
      title,
      content,
      image
    };
  } catch (error) {
    console.error('Error generating new blog:', error);
    throw error;
  }
} 