import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp({
  // Your Firebase config
});

const analytics = getAnalytics(app);

export const logEvent = (eventName, eventParams) => {
  try {
    firebaseLogEvent(analytics, eventName, eventParams);
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}:`, eventParams);
    }
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};

// Helper functions for common events
export const logPageView = (pagePath) => {
  logEvent('page_view', { page_path: pagePath });
};

export const logBlogView = (slug, title) => {
  logEvent('blog_view', { slug, title });
};

export const logAffiliateClick = (url, type) => {
  logEvent('affiliate_click', { url, type });
}; 