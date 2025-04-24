# Akiko Adventures

A fully automated, SEO-optimized React SPA that generates affiliate travel blogs using OpenAI & Pexels.

## Features

- Automated blog generation using OpenAI
- Dynamic image sourcing from Pexels
- SEO optimization with react-helmet-async
- Affiliate monetization via Trip.com
- Firebase hosting with SPA configuration
- Automated deployment via GitHub Actions

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `PEXELS_API_KEY`: Your Pexels API key
- `FIREBASE_DEPLOY_TOKEN`: Firebase deployment token
- `TRAVELPAYOUTS_MARKER`: Your Travelpayouts marker ID
- `MAILCHIMP_EMBED_CODE`: Mailchimp form embed code

## Deployment

The project is configured for automatic deployment via GitHub Actions. Each new blog post generated will trigger a build and deploy to Firebase.

## Project Structure

```
akiko-react/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── blogs/          # Markdown blog posts
│   ├── data/           # JSON data files
│   └── utils/          # Utility functions
├── scripts/            # Blog generation scripts
└── .github/workflows/  # GitHub Actions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 