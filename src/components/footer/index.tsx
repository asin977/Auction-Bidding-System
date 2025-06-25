import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../Routes';

import './styles.css';

export const Footer = () => (
  <div className="footer-container">
    <div>
      <p className="footer-content">
        &copy; 2025 GravelGood. All rights reserved.
      </p>
      <p className="footer-description">
        This is a real-time auction bidding system.Buit with JavaScript.
      </p>
      <div className="footer-links">
        <Link to="#about" className='footer-about'>About</Link>
        <Link to="#contact" className='footer-about'>Contact</Link>
      </div>
    </div>
  </div>
);
