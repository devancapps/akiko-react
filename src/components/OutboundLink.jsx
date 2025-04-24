import React from 'react';
import { logEvent } from '../utils/analytics';

const OutboundLink = ({ 
  href, 
  children, 
  className = '', 
  isAffiliate = false,
  ...props 
}) => {
  const handleClick = (e) => {
    logEvent('outbound_click', {
      url: href,
      isAffiliate,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel={`${isAffiliate ? 'sponsored ' : ''}noopener noreferrer`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default OutboundLink; 