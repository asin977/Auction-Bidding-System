import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Footer = () => (
  <div className="footer-container">
    <p className="footer-content">
      &copy; 2025 GravelGood. All rights reserved.
    </p>
    <p className="footer-description">
      This is a real-time auction bidding system.Buit with JavaScript.
    </p>
    <div className="footer-links">
      <Link to="routes.about" className="footer-about">
        About
      </Link>
      <Link to="routes.contact" className="footer-about">
        Contact
      </Link>
    </div>
  </div>
);

export default Footer;