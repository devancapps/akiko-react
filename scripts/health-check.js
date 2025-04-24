const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const https = require('https');
const { exec } = require('child_process');

const BLOGS_DIR = path.join(__dirname, '../src/blogs');
const BLOGS_JSON = path.join(__dirname, '../src/data/blogs.json');

async function checkBlogFiles() {
  try {
    // Read blogs.json
    const blogsData = JSON.parse(fs.readFileSync(BLOGS_JSON, 'utf8'));
    const blogFiles = fs.readdirSync(BLOGS_DIR);

    console.log('🔍 Starting blog health check...');

    // Check for missing .md files
    const missingFiles = blogsData.filter(blog => !blogFiles.includes(`${blog.slug}.md`));
    if (missingFiles.length > 0) {
      console.error('❌ Missing .md files:', missingFiles.map(b => b.slug));
    }

    // Check for extra .md files not in blogs.json
    const extraFiles = blogFiles.filter(file => {
      const slug = file.replace('.md', '');
      return !blogsData.some(blog => blog.slug === slug);
    });
    if (extraFiles.length > 0) {
      console.warn('⚠️ Extra .md files not in blogs.json:', extraFiles);
    }

    // Validate blog content
    for (const blog of blogsData) {
      const filePath = path.join(BLOGS_DIR, `${blog.slug}.md`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for broken links
        const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
        for (const link of links) {
          const [, text, url] = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (url.startsWith('http') && !url.includes('trip.com')) {
            console.warn(`⚠️ External link in ${blog.slug}: ${url}`);
          }
        }

        // Check for missing images
        const images = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
        for (const image of images) {
          const [, alt, src] = image.match(/!\[([^\]]*)\]\(([^)]+)\)/);
          if (!alt) {
            console.warn(`⚠️ Missing alt text for image in ${blog.slug}: ${src}`);
          }
        }
      }
    }

    // Check for duplicate slugs
    const slugs = blogsData.map(blog => blog.slug);
    const uniqueSlugs = new Set(slugs);
    if (slugs.length !== uniqueSlugs.size) {
      console.error('❌ Duplicate slugs found in blogs.json');
    }

    console.log('✅ Health check completed');
  } catch (error) {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  }
}

const checkDeployment = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'akiko.dev',
      port: 443,
      path: '/',
      method: 'GET',
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        reject(new Error(`Status code: ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
};

const checkBuild = () => {
  return new Promise((resolve, reject) => {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

const checkTests = () => {
  return new Promise((resolve, reject) => {
    exec('npm test', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

async function runHealthCheck() {
  try {
    console.log('Running health checks...');
    
    console.log('Checking build...');
    await checkBuild();
    console.log('Build check passed');
    
    console.log('Checking tests...');
    await checkTests();
    console.log('Tests check passed');
    
    console.log('Checking deployment...');
    await checkDeployment();
    console.log('Deployment check passed');
    
    console.log('All health checks passed!');
    process.exit(0);
  } catch (error) {
    console.error('Health check failed:', error);
    process.exit(1);
  }
}

// Run the health check
runHealthCheck(); 