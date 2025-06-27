import React, { useEffect, useState } from 'react';
import './styles.css';

const SignInHoverPreview: React.FC = () => {
  const [latestUsers, setLatestUsers] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users') || '[]');
    const recent = stored.slice(-3).reverse(); 
    setLatestUsers(recent);
  }, []);

  return (
    <div className="signin-preview-container">
      <img
        src="/assets/signin-image.png"
        alt="Sign In"
        className="signin-image"
      />
      <div className="hover-card">
        <h4>Recent Sign Ups</h4>
        <ul>
          {latestUsers.map((user, index) => (
            <li key={index}>{user.name || 'Anonymous'}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SignInHoverPreview;
