import React from 'react';
import { getPublicImageUrl } from '../utils/imageUtils';
import { env } from '../utils/env';

const ImageTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f7' }}>
      <h2>Image Loading Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Method 1: With Base URL Prefix</h3>
        <img 
          src={`${env.PUBLIC_URL}/avatar.jpg`} 
          alt="Base URL Path" 
          style={{ width: '200px', height: 'auto', border: '1px solid red' }} 
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Method 2: With env.PUBLIC_URL</h3>
        <img 
          src={env.PUBLIC_URL + "/avatar.jpg"} 
          alt="PUBLIC_URL Path" 
          style={{ width: '200px', height: 'auto', border: '1px solid green' }} 
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Method 3: With Base Path</h3>
        <img 
          src={`${env.PUBLIC_URL}/avatar.jpg`} 
          alt="Base Path" 
          style={{ width: '200px', height: 'auto', border: '1px solid blue' }} 
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Method 4: With Origin and Base Path</h3>
        <img 
          src={window.location.origin + env.PUBLIC_URL + "/avatar.jpg"} 
          alt="Origin with Base Path" 
          style={{ width: '200px', height: 'auto', border: '1px solid purple' }} 
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Method 5: Using Utility Function</h3>
        <img 
          src={getPublicImageUrl('/avatar.jpg')} 
          alt="Utility Function Path" 
          style={{ width: '200px', height: 'auto', border: '1px solid orange' }} 
        />
      </div>
    </div>
  );
};

export default ImageTest; 