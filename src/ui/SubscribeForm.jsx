import React, { useEffect } from 'react';

const SubscribeForm = () => {
  useEffect(() => {
    // Load Mailchimp script
    const script = document.createElement('script');
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.async = true;
    
    const container = document.getElementById('mc-embed');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && script.parentNode) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <div id="mc-embed" className="min-h-[200px]">
        {/* Mailchimp embed code will be loaded here */}
      </div>
    </div>
  );
};

export default SubscribeForm; 